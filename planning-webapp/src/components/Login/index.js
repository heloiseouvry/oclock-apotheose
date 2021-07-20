import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Checkbox } from 'semantic-ui-react';


import './styles.scss';
import { useState } from 'react/cjs/react.development';


function LoginForm ({ Login, error}) {

    const [details, setDetails] = useState({email: "", password: ""});

    const submitHandler = e =>{
        e.preventDefault();

        Login(details);
    }

    return(
        <div className='LoginForm'>
        <h1 className='title'>Se connecter</h1>
            
            <form className='inputForm' method="POST" onSubmit={submitHandler}> 
                <input type='email' placeholder='Email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/><br></br>               
                <input type="password" placeholder='Mot de passe'  onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            
                <Checkbox className='checkbox' label='Se souvenir de moi' />
            
                <div className='connect' >
                    <Button type='submit' className='button' content='Se connecter' primary />
                    {(error !="") ? (<div className="error">{error}</div>) : ""}
                    <a  className='forgottenPassword' href="/">Mot de passe oublié?</a>
                </div>
            </form>
            <div className='demo'>
                <p>Voullez vous essayer notre aplication?</p>   
                <Button type='submit' content='Nous contacter' secondary /> 
            </div>
        </div>
    )
};

export default LoginForm;