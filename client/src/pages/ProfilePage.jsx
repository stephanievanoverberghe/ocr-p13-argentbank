import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Account from '../components/Account';
import { fetchUserProfile, updateUserProfile } from '../apis/profile';
import Cookies from 'js-cookie';

function ProfilePage() {
    const [firstName, setFirstName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
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
        async function getUserProfile() {
            try {
                const data = await fetchUserProfile();
                setFirstName(data.body.firstName);
            } catch (error) {
                console.error('Erreur:', error.message);
                Cookies.remove('token');
                navigate('/login');
            }
        }

        getUserProfile();
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedName(firstName); // Initialise avec la valeur actuelle
    };

    const handleSaveClick = async () => {
        try {
            await updateUserProfile({ firstName: editedName });
            setFirstName(editedName); // Met à jour l'affichage avec le nouveau prénom
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil :', error.message);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedName('');
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold my-5 text-center">
                Welcome back
                <br />
                {!isEditing ? firstName || 'Nom utilisateur' : ''}
            </h1>

            {isEditing ? (
                <div className="flex flex-col items-center mb-8">
                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="border border-gray-300 p-2 rounded mb-2 text-black" />
                    <div>
                        <button onClick={handleSaveClick} className="text-white font-bold p-2 border-[#00bc77] border-[1px] bg-[#00bc77] mr-2">
                            Save
                        </button>
                        <button onClick={handleCancelClick} className="text-white font-bold p-2 border-red-500 border-[1px] bg-red-500">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button onClick={handleEditClick} className="text-white font-bold p-2 border-[#00bc77] border-[1px] bg-[#00bc77] mb-8">
                    Edit Name
                </button>
            )}

            {accounts.map((account, index) => (
                <Account key={index} title={account.title} amount={account.amount} description={account.description} />
            ))}
        </div>
    );
}

export default ProfilePage;
