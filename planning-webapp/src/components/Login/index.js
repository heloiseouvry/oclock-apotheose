import React from 'react';
import { useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Checkbox } from 'semantic-ui-react';

import './styles.scss';
    //Passing the Login and error message as an argument
function LoginForm ({ Login, error}) {
    //Setting the default details of the user to none 
    const [details, setDetails] = useState({email: "", password: ""});
    // (1)SubmitHandler is listening for the form to submit (onSubmit)
    const submitHandler = event =>{
        event.preventDefault();

        Login(details);
    }

    return(
        <div className='LoginForm'>
        <h1 className='title'>Se connecter</h1>
                             {/* // (1)When the form will be submitted it will pass the pass the information to submitHandler  */}
            <form className='inputForm' method="POST" onSubmit={submitHandler}> 
                             {/* // Here we collect the detailled data of the email and password input    */}
                <input type='email' placeholder='Email' onChange={event => setDetails({...details, email: event.target.value})} value={details.email}/><br></br>               
                <input type="password" placeholder='Mot de passe'  onChange={event => setDetails({...details, password: event.target.value})} value={details.password}/>
            
                <Checkbox className='checkbox' label='Se souvenir de moi' />
            
                <div className='connect' >
                    <Button type='submit' className='button' content='Se connecter' primary />
                    {(error !="") ? (<div className="error">{error}</div>) : ""}
                    <a  className='forgottenPassword' href="/">Mot de passe oublié?</a>
                </div>
            </form>
            <div className='demo'>
                <p>Voullez vous essayer notre aplication?</p> 
                <Link to ="/contact">  
                <Button content='Nous contacter' secondary /> 
                </Link>
            </div>
        </div>
    )
};

export default LoginForm;