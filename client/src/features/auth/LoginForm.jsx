import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { loginUser } from '../../apis/login';

const schema = yup.object().shape({
    username: yup.string().required('The username is required.'),
    password: yup.string().required('The password is required.'),
});

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const result = await loginUser(data);
            dispatch(
                setUser({
                    firstName: result.body.firstName,
                    token: result.body.token,
                })
            );
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
            </form>
        </section>
    );
}

export default LoginForm;
