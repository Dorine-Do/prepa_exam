import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export function Login() {

    const [formData, setFormData] = useState({
        username:'',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const connectUser = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut : ${response.status}`);
            }
            
            // Récup le token générer en back
            const data = await response.json();
            const token = data.token;

            // Stocké le token dans le localStorage
            localStorage.setItem('token', token);

            
            navigate('/crudQuote')

        } catch (error) {
            console.error('Erreur lors de la connexion de l\'utilisateur :', error);
            alert('Une erreur s\'est produite lors de la connexion de l\'utilisateur. Veuillez réessayer.');
        }
    };

  

  return (
    <form onSubmit={connectUser}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input type="text" id="username" name="username" onChange={handleChange} required/>

        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" onChange={handleChange} required/>

        <button type="submit">Se connecter</button>
    </form>
  )
}