import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
            <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
            <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 px-6 py-3 text-white bg-[#00bc77] rounded-md hover:bg-[#009e62] focus:outline-none focus:ring focus:ring-green-300">
                Go Back Home
            </Link>
        </div>
    );
}

export default NotFoundPage;
