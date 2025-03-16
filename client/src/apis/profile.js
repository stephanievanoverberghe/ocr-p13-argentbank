import Cookies from 'js-cookie';

const API_PROFILE = 'http://localhost:3001/api/v1/user/profile';

/**
 * Récupère les informations de l'utilisateur connecté.
 * @returns {Promise<Object>} Les données utilisateur.
 * @throws {Error} Si aucun token n'est trouvé ou si la requête échoue.
 */
export async function fetchUserProfile() {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(API_PROFILE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user profile');
    }

    return response.json();
}

/**
 * Met à jour les informations de l'utilisateur connecté.
 * @param {Object} updatedData - Les nouvelles données utilisateur.
 * @param {string} updatedData.firstName - Le nouveau prénom de l'utilisateur.
 * @returns {Promise<Object>} Les données mises à jour de l'utilisateur.
 * @throws {Error} Si aucun token n'est trouvé ou si la requête échoue.
 */
export async function updateUserProfile(updatedData) {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(API_PROFILE, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user profile');
    }

    return response.json();
}

