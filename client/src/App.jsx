import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    const location = useLocation();

    const darkBackgroundPages = ['/login', '/profile', '/404'];
    const isLoginPage = location.pathname === '/login';

    const isBlackBackground = darkBackgroundPages.includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className={`flex-grow ${isBlackBackground ? 'bg-[#12002b] text-white' : 'bg-white'} ${isLoginPage ? 'flex items-center justify-center' : ''}`}>
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

export default App;
