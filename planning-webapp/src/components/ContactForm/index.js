import React from 'react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Checkbox } from 'semantic-ui-react';

import './styles.scss';

function ContactForm () {

    return(
        <div className='LoginForm'>
        <h1 className='title'>Nous contacter</h1>

            <form className='inputForm' method="POST"> 
                <div classname='contactDiv'>
                    <div className='contactInfo'>
                        <input type='text' placeholder='Votre nom'/>
                        <input type='text' placeholder='Votre prenom'/> 
                        <input type='email' placeholder='Votre email'/>
                    </div> 
                    <div className='contactInfo'>
                        <input type='text' placeholder='Votre numéro'/>
                        <input type="password" placeholder='Mot de passe'/>
                        <input type="password" placeholder='Confirmez le mot de passe'/>
                    </div>
                </div>
                <textarea className='comment' type='text' placeholder='Laissez un commentaire (500 charactère maximum)' maxlength = "500"/> 

                <div className='connect' >
                    <Button type='submit' className='button' content='Envoyer' primary />
                </div>
            </form>

            <div className='demo'>
                <p>Vous avez déjà un compte? Connectez-vous!</p>
                <Link to ="/login">   
                <Button content='Se connecter' secondary /> 
                </Link>
            </div>
        </div>
    )
};

export default ContactForm;