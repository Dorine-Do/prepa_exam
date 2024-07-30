import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import WelcomeComponent from './Welcome';
import CrudQuoteComponent from './QuoteComponent/crudQuote';
import {Login} from './AuthComponent/Login';
import {SignUp} from './AuthComponent/SignUp';


function App() {

  return (
    <div>

      <Router>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/inscription" element={<SignUp/>} />
            <Route path="/connexion" element={<Login/>} />
            <Route path="/crudQuote" element={<CrudQuoteComponent/>} />
            <Route path="/welcome" element={<WelcomeComponent/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
