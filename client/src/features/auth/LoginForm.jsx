import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Schéma de validation avec Yup
const schema = yup.object().shape({
    username: yup.string().required("Le nom d'utilisateur est requis."),
    password: yup.string().required('Le mot de passe est requis.'),
});

function LoginForm() {
    const navigate = useNavigate();

    // Gestion du formulaire avec react-hook-form et Yup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit = async (data) => {
        try {
            // Appel à l'API backend pour la connexion
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.username,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const result = await response.json();

            // Stocker le token JWT dans le localStorage
            localStorage.setItem('token', result.body.token);

            // Redirection vers la page de profil
            navigate('/profile');
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            alert('Invalid credentials');
        }
    };

    return (
        <section className="flex flex-col items-center justify-center bg-white text-[#2c3e50] p-8 w-[300px]">
            <i className="fa fa-user-circle text-lg"></i>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                {/* Champ Username */}
                <div className="flex flex-col text-left mb-4">
                    <label htmlFor="username" className="font-bold">
                        Username
                    </label>
                    <input type="text" id="username" {...register('username')} className="border-black border-[1px] rounded-sm" />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                {/* Champ Password */}
                <div className="flex flex-col text-left mb-4">
                    <label htmlFor="password" className="font-bold">
                        Password
                    </label>
                    <input type="password" id="password" {...register('password')} className="border-black border-[1px] rounded-sm" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Checkbox Remember Me */}
                <div className="flex">
                    <input type="checkbox" id="remember-me" {...register('rememberMe')} />
                    <label htmlFor="remember-me" className="ml-2">
                        Remember me
                    </label>
                </div>

                {/* Bouton de soumission */}
                <button type="submit" className="block w-full text-white underline p-2 text-xl font-bold mt-4 border-[#00bc77] border-[1px] bg-[#00bc77]">
                    Sign In
                </button>
            </form>
        </section>
    );
}

export default LoginForm;
