import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    firstName: '',
    token: Cookies.get('token') || null, // Récupérer le token depuis les cookies
    isAuthenticated: !!Cookies.get('token'), // Vérifier si le token existe
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.firstName = action.payload.firstName;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            Cookies.set('token', action.payload.token, { expires: 7 }); // Stocker le token dans les cookies
        },
        clearUser: (state) => {
            state.firstName = '';
            state.token = null;
            state.isAuthenticated = false;
            Cookies.remove('token'); // Supprimer le token des cookies
        },
        updateFirstName: (state, action) => {
            state.firstName = action.payload.firstName;
        },
    },
});

export const { setUser, clearUser, updateFirstName } = userSlice.actions;

export default userSlice.reducer;
