import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './styles.scss';

const PageNotFound= () =>{

    return(
        <div className="page-not-found">
        
            <h1>Error 404 </h1>
            <img src="https://media1.tenor.co/images/46e53c492931db75c414185910625a8d/tenor.gif?itemid=7689012&fbclid=IwAR1o0cfUFgknch2BDjdksFirURpIqSyJwmfDZGsEkP1P9EobjukFTRz4fSI"/> 
            <h2>“Un voyage de mille lieues a commencé par un pas.”</h2>
            <h4>Proverbe Chinois</h4>
            <br></br>
            <Link to ="/">  
                <Button content='Retour' secondary /> 
            </Link>
        </div>
    )
};

export default PageNotFound;