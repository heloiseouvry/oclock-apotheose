import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Checkbox } from 'semantic-ui-react';


import './styles.scss';

const LoginForm = () => {

    return(
        <form className='LoginForm'>
          <h1 className='title'>Connectez-vous!</h1>

            <form className='inputForm'> 
                <input type='email' placeholder='Email' /><br></br>               
                <input type='password' placeholder='Mot de passe' />
            </form>
           
            <Checkbox className='checkbox' label='Se souvenir de moi' />
            
            <div className='connect' >
                <Button content='Nous contacter' secondary /> 
                <Button className='button' content='Se connecter' primary />
            </div>
                <a  className='forgottenPassword' href="/">Avez-vous oublié votre mot de passe?</a>

        </form>
    )
};
  
  export default LoginForm;


