import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";


import './styles.scss';

const Header= () => { 

  function logout() {
    localStorage.removeItem('token');
  }
    return (
      // Here we use a link to redirect the user to the "/" route   
        <Link to ="/">
        <header className='header'>
          <img src="https://img.icons8.com/ios/100/000000/health-calendar.png"/>    
          <h1 className="title">Kapouévent</h1>
          <Button className='logout' content="Déconnexion" icon="log out" onClick={logout} />
        </header>
        </Link>

    )
};

export default Header;
