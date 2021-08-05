import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Header= () => { 

    return (
        <Link to ="/">
        <header className='header'>
          <h1 id="h1-Kapouevent-header">Kapouévent</h1>
        </header>
        </Link>
    )
};

export default Header;
