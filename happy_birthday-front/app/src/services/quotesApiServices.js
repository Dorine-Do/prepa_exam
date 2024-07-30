export const getRandomQuote = async () => {
    // Ne fonctionne pas
    // let queryUrl = `${apiBaseUrl}/getQuote`;
  
    try {
      const data = await fetch('http://localhost:3002/getQuote', {
        'Content-Type': 'application/json',
      }).json();
      return data;
    } catch (error) {
      return false;
    }
  };


  export const getQuotes = async () => {
    const token = localStorage.getItem('token');
    
    console.log('*******************')

    try {
      const response = await fetch('http://localhost:3002/getQuotes', {
        'Content-Type': 'application/json',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).json();

      console.log('response', response)

      if (response.status === 401) {
        // Rediriger vers la page de connexion si non autorisé
        window.location.href = '/login';
      } else if (response.status === 403) {
        // Gérer une erreur de permission
        window.location.href = '/welcome';
      }

      return response;

    } catch (error) {

      return false;

    }
  };