// services/authService.js
import { useNavigate } from 'react-router-dom';

const useAuthService = () => {

  const navigate = useNavigate();

  const checkAuth = async () => {
    // Récup le token dans le localstorage
    const token = localStorage.getItem('token');
    try {
      // Envoie du token dans le headers de la rqt
      const response = await fetch('http://localhost:3002/checkAuth', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
 
      if (response.status === 401) {
        navigate('/inscription');
      } else if (response.status === 403) {
        navigate('/welcome');
      } else if (response.ok) {
        return true;
      } else {
        navigate('/welcome');
      }
    } catch (error) {
      console.error('Erreur:', error);
      navigate('/welcome');
      return false;
    }
  };

  return { checkAuth };
};

export default useAuthService;
