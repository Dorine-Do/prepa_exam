import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export function SignUp() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        passwords: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const addUser = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut : ${response.status}`);
            }

            // Une fois que l'utilisateur s'est inscrit, lui afficher le componnent connexion
            navigate('/connexion')

        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            alert('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur. Veuillez réessayer.');
        }
    };

  

  return (
    <form onSubmit={addUser}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input type="text" id="username" name="username" onChange={handleChange} required/>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} required/>
        
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" onChange={handleChange} required/>


        <button type="submit">S'inscrire</button>
    </form>
  )
}