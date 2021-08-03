import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Header= () => { 

    return (
        <Link to ="/">
        <header className='header'>
          <img src="https://img.icons8.com/ios/100/000000/health-calendar.png"/>    
          <h1>Kapouévent</h1>
        </header>
        </Link>

    )
};

export default Header;
