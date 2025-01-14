import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/login',
                caseSensitive: true,
                element: <LoginPage />,
            },
            {
                path: '/profile',
                caseSensitive: true,
                element: <ProfilePage />,
            },
            {
                path: '/404',
                element: <NotFoundPage />,
            },
            {
                path: '*',
                element: <Navigate to="/404" replace />,
            },
        ],
    },
]);
