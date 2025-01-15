import Cookies from 'js-cookie';

const API_PROFILE = 'http://localhost:3001/api/v1/user/profile';

/**
 * Récupère les informations utilisateur.
 * @returns {Promise<Object>} Les données utilisateur.
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
