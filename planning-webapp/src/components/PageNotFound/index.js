import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './styles.scss';

const PageNotFound= () =>{

    return(
        <div className="page-not-found">
            <h1>ERROR 404</h1>
            <Link to ="/">  
                <Button content='Retour' secondary /> 
            </Link>
        </div>
    )
};

export default PageNotFound;