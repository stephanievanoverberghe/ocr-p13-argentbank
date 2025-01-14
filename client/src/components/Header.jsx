import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/images/argentBankLogo.png';

function Header() {
    const [userFirstName, setUserFirstName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Appel API pour récupérer les informations utilisateur
            fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Failed to fetch user data');
                    return response.json();
                })
                .then((data) => setUserFirstName(data.body.firstName))
                .catch((error) => console.error('Erreur lors de la récupération des données utilisateur :', error));
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token'); // Supprimer le token
        setUserFirstName(null); // Réinitialiser l'état utilisateur
        navigate('/'); // Rediriger vers la page d'accueil
    };

    return (
        <header>
            <nav className="flex justify-between items-center py-[5px] px-5">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Argent Bank Logo" className="max-w-full w-[200px]" />
                </Link>
                <div className="flex items-center">
                    {userFirstName ? (
                        <>
                            <NavLink to="/profile" className="no-underline hover:underline font-bold flex items-center mr-4">
                                <i className="fa fa-user-circle mr-2"></i>
                                {userFirstName}
                            </NavLink>
                            <button onClick={handleSignOut} className="no-underline hover:underline font-bold flex items-center">
                                <i className="fa fa-sign-out mr-2"></i>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="no-underline hover:underline font-bold flex items-center">
                            <i className="fa fa-user-circle mr-2"></i>
                            Sign In
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
