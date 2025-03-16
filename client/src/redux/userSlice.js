import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// État initial du slice utilisateur
const initialState = {
    firstName: '',
    lastName: '',
    token: Cookies.get('token') || null,
    isAuthenticated: !!Cookies.get('token'),
};

/**
 * Slice Redux pour gérer l'état utilisateur.
 * Contient les reducers pour les actions liées à l'utilisateur, comme la connexion,
 * la déconnexion et la mise à jour du prénom.
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Définit les informations de l'utilisateur dans le store.
         * @param {Object} state - État actuel du store.
         * @param {Object} action - Action contenant les données utilisateur et le token.
         */
        setUser: (state, action) => {
            state.firstName = action.payload.firstName;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            Cookies.set('token', action.payload.token, { expires: 1 / 12 });
        },
        /**
         * Réinitialise l'état utilisateur lors de la déconnexion.
         * Supprime le prénom, le token et l'état d'authentification.
         * @param {Object} state - État actuel du store.
         */
        clearUser: (state) => {
            state.firstName = '';
            state.token = null;
            state.isAuthenticated = false;
            Cookies.remove('token'); // Supprime le token des cookies
        },
        /**
         * Met à jour le prénom de l'utilisateur dans le store.
         * @param {Object} state - État actuel du store.
         * @param {Object} action - Action contenant le nouveau prénom.
         */
        updateFirstName: (state, action) => {
            state.firstName = action.payload.firstName;
        },
        /**
         * Met à jour le nom de l'utilisateur dans le store.
         * @param {Object} state - État actuel du store.
         * @param {Object} action - Action contenant le nouveau prénom.
         */
        updateLastName: (state, action) => {
            state.lastName = action.payload.lastName;
        },
    },
});

export const { setUser, clearUser, updateFirstName, updateLastName } = userSlice.actions;

export default userSlice.reducer;
