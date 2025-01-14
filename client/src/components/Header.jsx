import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/argentBankLogo.png';

function Header() {
    const { user, logout } = useAuth();

    return (
        <header>
            <nav className="flex justify-between items-center py-[5px] px-5">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Argent Bank Logo" className="max-w-full w-[200px]" />
                </Link>
                <div className="flex items-center">
                    {user ? (
                        <>
                            <NavLink to="/profile" className="no-underline hover:underline font-bold flex items-center mr-4">
                                <i className="fa fa-user-circle mr-2"></i>
                                {user.firstName}
                            </NavLink>
                            <button onClick={logout} className="no-underline hover:underline font-bold flex items-center">
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
