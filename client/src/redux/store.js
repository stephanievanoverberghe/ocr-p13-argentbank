import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setUser } from './userSlice';
import Cookies from 'js-cookie';
import { fetchUserProfile } from '../apis/profile';

/**
 * Configuration du store Redux de l'application.
 * Initialise les reducers nécessaires et définit la logique d'initialisation
 * de l'utilisateur à partir des cookies.
 */
const store = configureStore({
    reducer: {
        user: userReducer, // Gestionnaire de l'état utilisateur
    },
});

/**
 * Initialise l'état utilisateur à partir des cookies si un token est présent.
 * Cela permet de restaurer l'état utilisateur après un rafraîchissement de la page.
 */
const token = Cookies.get('token');
if (token) {
    fetchUserProfile()
        .then((data) => {
            store.dispatch(setUser({ firstName: data.body.firstName, token })); // Met à jour l'état Redux avec les données utilisateur
        })
        .catch(() => {
            Cookies.remove('token'); // Supprime le token s'il est invalide
        });
}

export default store;
