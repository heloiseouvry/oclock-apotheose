import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";


import './styles.scss';

const TechNavbar= () => { 
    return (
      <nav className="tech-navbar">
        <Link to ="/calendar">
          <Button className='calendar' content="Planning" />
        </Link>
      </nav>
    )
};

export default TechNavbar;
