import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";


import './styles.scss';

const AdminNavbar= () => { 
    return (
      <nav className="admin-navbar">
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
    )
};

export default AdminNavbar;
