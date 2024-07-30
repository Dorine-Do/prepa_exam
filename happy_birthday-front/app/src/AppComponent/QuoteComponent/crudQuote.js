import { getQuotes } from '../../services/quotesApiServices';
import { useState, useEffect } from 'react';
import useAuthService from '../../services/authApiService';


function CrudQuoteComponent(props) {
  const [quotes, setQuotes] = useState([]);
  const { checkAuth } = useAuthService()
  
    // Utilisation de useEffect quand connection externe (hormis via un form)
    useEffect(() => {
      // Verifie si l'utilisateur peut acceder à cette page
      const fetchAuth = async  () => {
        // Fetch checkAuth route en Back
        const isAuthenticated = await checkAuth();
        // console.log('isAuthenticated',isAuthenticated)
        if (isAuthenticated) {
          // Récup les quotes via un autre fetch
          const quotesData = await getQuotes();
          // console.log('quotesData', quotesData)
          setQuotes(quotesData);
          // console.log('quotes', quotes)
        }
      }
      fetchAuth()
    },[checkAuth])

    return (
      <div>
        <p>toto</p>
        {quotes.map(quote => (
          <div key={quote.id}>{quote.author} , {quote.text}</div>
        ))}
      </div>
      
        // <div>
        //     toto
        // </div>
    )
}

export default CrudQuoteComponent;