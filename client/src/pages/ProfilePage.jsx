import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Account from '../components/Account';

function ProfilePage() {
    const [firstName, setFirstName] = useState('');
    const navigate = useNavigate();

    const accounts = [
        {
            title: 'Argent Bank Checking (x8349)',
            amount: '$2,082.79',
            description: 'Available Balance',
        },
        {
            title: 'Argent Bank Savings (x6712)',
            amount: '$10,928.42',
            description: 'Available Balance',
        },
        {
            title: 'Argent Bank Credit Card (x8349)',
            amount: '$184.30',
            description: 'Current Balance',
        },
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
            return;
        }

        fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données utilisateur');
                }
                return response.json();
            })
            .then((data) => setFirstName(data.body.firstName))
            .catch((error) => {
                console.error('Erreur:', error);
                navigate('/login');
            });
    }, [navigate]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold my-5 text-center">
                Welcome back
                <br />
                {firstName || 'Nom utilisateur'}
            </h1>
            <button className="text-white font-bold p-2 border-[#00bc77] border-[1px] bg-[#00bc77] mb-8">Edit Name</button>
            {accounts.map((account, index) => (
                <Account key={index} title={account.title} amount={account.amount} description={account.description} />
            ))}
        </div>
    );
}

export default ProfilePage;
