const API_LOGIN = 'http://localhost:3001/api/v1/user/login';

/**
 * Appelle l'API pour se connecter.
 * @param {Object} credentials - Les informations de connexion (email, password).
 * @returns {Promise<Object>} Les données de l'utilisateur et le token.
 */
export async function loginUser(credentials) {
    const response = await fetch(API_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Invalid credentials');
    }

    return response.json();
}
