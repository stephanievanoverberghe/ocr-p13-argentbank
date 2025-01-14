import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Vérifier si un token existe au chargement
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch user data');
                    return res.json();
                })
                .then((data) => {
                    setUser({ firstName: data.body.firstName });
                })
                .catch((err) => {
                    console.error('Error fetching user profile:', err);
                    Cookies.remove('token'); // Supprimer un token invalide
                    setUser(null);
                });
        }
    }, []);

    const login = (token, userData) => {
        Cookies.set('token', token, { expires: 7 }); // Stocke le token
        setUser(userData); // Stocke les données utilisateur
    };

    const logout = () => {
        Cookies.remove('token'); // Supprimer le token
        setUser(null); // Réinitialise l'utilisateur
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
