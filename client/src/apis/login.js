const API_LOGIN = 'http://localhost:3001/api/v1/user/login';

/**
 * Effectue une requête pour connecter un utilisateur.
 * @param {Object} credentials - Les identifiants de l'utilisateur.
 * @param {string} credentials.username - L'email ou le nom d'utilisateur.
 * @param {string} credentials.password - Le mot de passe.
 * @returns {Promise<Object>} Les données utilisateur et le token.
 * @throws {Error} Si la requête échoue ou si les identifiants sont invalides.
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
