import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import { slide as Menu } from 'react-burger-menu'

import './styles.scss';

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '10px',
    top: '80px'
  },
  bmBurgerBars: {
    background: 'white'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },

}

class  AdminNavbar extends React.Component { 
  
  showSettings (event) {
    event.preventDefault();
    
    
    
  } render () {
    return (
      <nav className="admin-navbar">
        <nav className='nav-desktop'>
          <Link to ="/calendar">
            <Button className='calendar' content="Planning" />
          </Link>
          <Link to ="/addtech">
            <Button className='addtech' content="Ajouter un technicien" />
          </Link>
          <Link to ="/viewtech">
            <Button className='viewtech' content="Consulter le profil d'un technicien" />
          </Link>
          <Link to ="/salaryreport">
            <Button className='salaryreport' content="Synthèse des salaires" />
          </Link>
        </nav>

        <nav className='nav-mobile'>
          <Menu onClick={ this.showSettings } styles={ styles }>
            <a id="calendar" className="menu-item" href="/calendar">Calendar</a>
            <a id="addtech" className="menu-item" href="/addtech">Add technicien</a>
            <a id="viewtech" className="menu-item" href="/viewtech">Profile</a>
            <a id="viewtech" className="menu-item--small" href="/salaryreport">Salaires</a>
          </Menu>
        </nav>
      </nav>
    );
  }
};

export default AdminNavbar;
