import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Checkbox, Form} from 'semantic-ui-react'


import './styles.scss';

const LoginForm = () => {
    return(
        <form className='LoginForm'>
          <h1 className='title'>Connectez-vous!</h1>

            <Form.Field className='emailForm'>
                <label className='labelForm'>Email</label>
                <input className='inputForm' placeholder='email' />               
            </Form.Field>

            <Form.Field className='passwordForm'>
                <label className='labelForm'>Mot de Passe</label>
                <input className='inputForm' placeholder='Mot de passe' />
            </Form.Field>
           
            <Checkbox className='checkbox' label='Se souvenir de moi' />
            
            <div className='connect' >
                <Button className='button' content='Se connecter' primary />
                <a  className='forgottenPassword' href="/">Avez-vous oublié votre mot de passe?</a>
            </div>

        </form>
    )
};
  
  export default LoginForm;