import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateFirstName } from '../redux/userSlice';
import Account from '../components/Account';
import { fetchUserProfile, updateUserProfile } from '../apis/profile';
import { accounts } from '../data/account';

/**
 * Composant de la page de profil utilisateur.
 * Permet d'afficher les informations de l'utilisateur et de modifier son prénom.
 * @returns {JSX.Element} Composant de la page de profil.
 */
function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { firstName } = useSelector((state) => state.user); // Récupération des données utilisateur depuis Redux

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');

    /**
     * Charge les données utilisateur lors du montage du composant.
     */
    useEffect(() => {
        async function getUserProfile() {
            try {
                const data = await fetchUserProfile();
                dispatch(updateFirstName({ firstName: data.body.firstName }));
            } catch (error) {
                console.error('Erreur:', error.message);
                navigate('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
            }
        }

        getUserProfile();
    }, [dispatch, navigate]);

    /**
     * Active le mode édition.
     */
    const handleEditClick = () => {
        setIsEditing(true);
        setEditedName(firstName); // Initialise avec la valeur actuelle
    };

    /**
     * Enregistre le nouveau prénom dans la base de données et dans Redux.
     */
    const handleSaveClick = async () => {
        try {
            await updateUserProfile({ firstName: editedName });
            dispatch(updateFirstName({ firstName: editedName })); // Met à jour Redux
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil :', error.message);
        }
    };

    /**
     * Annule l'édition et réinitialise le champ de saisie.
     */
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
