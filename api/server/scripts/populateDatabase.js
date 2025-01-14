const axios = require('axios');
const signupApi = 'http://localhost:3001/api/v1/user/signup';

const users = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony@stark.com',
    password: 'password123',
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
    email: 'steve@rogers.com',
    password: 'password456',
  },
];

users.forEach(async (user) => {
  try {
    const existingUser = await axios.post('http://localhost:3001/api/v1/user/login', {
      email: user.email,
      password: user.password,
    });

    if (existingUser.data) {
      console.log(`L'utilisateur avec l'email ${user.email} existe déjà.`);
    }
  } catch (loginError) {
    if (loginError.response && loginError.response.status === 401) {
      // L'utilisateur n'existe pas, on le crée
      try {
        const response = await axios.post(signupApi, user);
        console.log('Utilisateur créé :', response.data);
      } catch (signupError) {
        console.error('Erreur lors de la création de l\'utilisateur :', signupError.response?.data || signupError.message);
      }
    } else {
      console.error('Erreur inattendue lors de la vérification de l\'utilisateur :', loginError.message);
    }
  }
});
