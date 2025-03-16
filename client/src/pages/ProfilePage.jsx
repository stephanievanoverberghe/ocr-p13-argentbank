import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateFirstName, updateLastName } from '../redux/userSlice';
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

    const { firstName, lastName } = useSelector((state) => state.user); // Récupération des données utilisateur depuis Redux

    const [isEditing, setIsEditing] = useState(false);
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');

    /**
     * Charge les données utilisateur lors du montage du composant.
     */
    useEffect(() => {
        async function getUserProfile() {
            try {
                const data = await fetchUserProfile();
                dispatch(updateFirstName({ firstName: data.body.firstName }));
                dispatch(updateLastName({ lastName: data.body.lastName }));
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
        setEditedFirstName(firstName); // Initialise avec la valeur actuelle
        setEditedLastName(lastName); // Initialiser avec la valeur actuelle
    };

    /**
     * Enregistre le nouveau prénom dans la base de données et dans Redux.
     */
    const handleSaveClick = async () => {
        try {
            await updateUserProfile({ firstName: editedFirstName, lastName: editedLastName });
            dispatch(updateFirstName({ firstName: editedFirstName }));
            dispatch(updateLastName({ lastName: editedLastName }));
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
        setEditedFirstName('');
        setEditedLastName('');
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold my-5 text-center">
                Welcome back
                <br />
                {!isEditing ? `${firstName} ${lastName}` : ''}
            </h1>

            {isEditing ? (
                <div className="flex flex-col items-center mb-8">
                    <div className="">
                        <input
                            type="text"
                            value={editedFirstName}
                            onChange={(e) => setEditedFirstName(e.target.value)}
                            className="border border-gray-300 p-2 rounded mb-2 mr-2 text-black"
                        />
                        <input
                            type="text"
                            value={editedLastName}
                            onChange={(e) => setEditedLastName(e.target.value)}
                            className="border border-gray-300 p-2 rounded mb-2 text-black"
                        />
                    </div>
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
