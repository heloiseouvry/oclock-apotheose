import React, { useState } from 'react';
import LoginForm from './index';

function LoginApp() {

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123",
    }

    const [user, setUser] = useState({email:"",password:""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);
        if(details.email == adminUser.email && details.password == adminUser.password){
            console.log("loggedIn")
            setUser({
                email: details.email
            });
        } else {
            console.log('Les informations sont incorrectes !')
            setError('Les informations sont incorrectes !')
        }

    }

    const Logout = () =>{
        console.log("logout");
        setUser({email:"",password:""});
    }
 
    return (
        <div>
            {(user.email != "") ? <button onClick={Logout}>Deconnexion</button> : <LoginForm Login={Login} error={error} />}
        </div>
    )
};

export default LoginApp;
