import React, { useState } from 'react';
import LoginForm from './index';
import Calendar from '../Calendar'

function LoginApp() {

    //Front Login until the real props connected with the API
    const adminUser = {
        email: "admin@admin.com",
        password: "admin123",
    }
    //Setting the default details of the user to none 
    const [user, setUser] = useState({email:"",password:""});
    //Setting the error
    const [error, setError] = useState("");

    //Checking if the user is logged in
    const Login = details => {
        // (1)if the email and the password match the info of adminUser then the user is logged in
        if(details.email == adminUser.email && details.password == adminUser.password){
            setUser({
                email: details.email
            });
        // (2)if the email and the password don't match the info of adminUser then we show an error message
        } else {
            setError('Les informations sont incorrectes !')
        }
    }
    //Logging out and setting the user default to none
    const Logout = () =>{
        setUser({email:"",password:""});
    }

    return (
        <div>
            {(user.email != "") ?
            // (1)Once we are logged in we render Calendar
                <Calendar /> : 
            // (1)if we have an error then we render the error message
                <LoginForm Login={Login} error={error} />}
        </div>
    )
};

export default LoginApp;
