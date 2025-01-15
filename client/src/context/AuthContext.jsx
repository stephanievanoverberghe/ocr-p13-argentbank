import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../apis/profile';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function initializeUser() {
            try {
                const token = Cookies.get('token');
                if (token) {
                    const data = await fetchUserProfile();
                    setUser({ firstName: data.body.firstName });
                }
            } catch (err) {
                console.error('Error initializing user:', err.message);
                Cookies.remove('token');
                setUser(null);
            }
        }

        initializeUser();
    }, []);

    const login = (token, userData) => {
        Cookies.set('token', token, { expires: 7 }); // Stocke le token dans les cookies
        setUser(userData); // Met à jour le contexte utilisateur
        navigate('/profile'); // Redirige vers le profil
    };

    const logout = () => {
        Cookies.remove('token'); // Supprime le token
        setUser(null); // Réinitialise les données utilisateur
        navigate('/'); // Redirige vers la page d'accueil
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};
