import React from 'react';
import './styles.scss';
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'


const Homepage= () => {
    return(
        <div className="homepage">
        <h1 className="title">Kapouévent</h1>
        <img src="https://img.icons8.com/ios/100/000000/health-calendar.png"/>
        <h2 className="slogan">Créez vos évènements, organisez et partagez au sein de votre équipe. </h2>
        <img className="image-exemple" src="https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg"/> 
            <div>   
            <Button content='Se connecter' primary />
            <Button content='Nous contacter' secondary /> 
            </div>
        
        </div>
    );

}

export default Homepage;