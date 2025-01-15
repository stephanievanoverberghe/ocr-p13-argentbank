import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import logo from '../assets/images/argentBankLogo.png';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Récupération des données utilisateur depuis Redux
    const { firstName, isAuthenticated } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(clearUser()); // Réinitialise le store
        navigate('/'); // Redirige vers la page d'accueil
    };

    return (
        <header>
            <nav className="flex justify-between items-center py-[5px] px-5">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Argent Bank Logo" className="max-w-full w-[200px]" />
                </Link>
                <div className="flex items-center">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/profile" className="no-underline hover:underline font-bold flex items-center mr-4">
                                <i className="fa fa-user-circle mr-2"></i>
                                {firstName}
                            </NavLink>
                            <button onClick={handleLogout} className="no-underline hover:underline font-bold flex items-center">
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
