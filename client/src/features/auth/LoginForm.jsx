import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { loginUser } from '../../apis/login';

// Schéma de validation des données avec Yup
const schema = yup.object().shape({
    username: yup.string().required('The username is required.'),
    password: yup.string().required('The password is required.'),
});

/**
 * Formulaire de connexion des utilisateurs.
 * Permet de saisir un nom d'utilisateur et un mot de passe pour se connecter au système.
 * @returns {JSX.Element} Composant du formulaire de connexion.
 */
function LoginForm() {
    const dispatch = useDispatch(); // Utilisé pour envoyer des actions Redux
    const navigate = useNavigate(); // Permet de rediriger l'utilisateur après la connexion

    const [errorMessage, setErrorMessage] = useState('');

    // Configuration du formulaire avec react-hook-form et Yup pour la validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * Gère la soumission du formulaire.
     * @param {Object} data - Données du formulaire {username, password}.
     */
    const onSubmit = async (data) => {
        try {
            const result = await loginUser(data); // Appel API pour se connecter
            dispatch(
                setUser({
                    firstName: result.body.firstName,
                    token: result.body.token,
                })
            );
            navigate('/profile');
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);

            let message = 'Une erreur est survenue. Merci de réessayer plus tard.';

            if (error.message) {
                message = error.message;
            }

            setErrorMessage(message);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center bg-white text-[#2c3e50] p-8 w-[300px]">
            <i className="fa fa-user-circle text-lg"></i>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-col text-left mb-4">
                    <label htmlFor="username" className="font-bold">
                        Username
                    </label>
                    <input type="text" id="username" {...register('username')} className="border-black border-[1px] rounded-sm" />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>
                <div className="flex flex-col text-left mb-4">
                    <label htmlFor="password" className="font-bold">
                        Password
                    </label>
                    <input type="password" id="password" {...register('password')} className="border-black border-[1px] rounded-sm" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <button type="submit" className="block w-full text-white underline p-2 text-xl font-bold mt-4 border-[#00bc77] border-[1px] bg-[#00bc77]">
                    Sign In
                </button>
                {errorMessage && <p className="text-red-500 text-sm mt-2 transition-opacity duration-300 ease-in-out">{errorMessage}</p>}
            </form>
        </section>
    );
}

export default LoginForm;
