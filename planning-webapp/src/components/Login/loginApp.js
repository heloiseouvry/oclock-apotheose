import React, { useState } from "react";
import LoginForm from "./index";
import Calendar from "../Calendar";
import axios from "axios";
import { BrowserRouter, Switch , Route, Redirect } from 'react-router-dom';

const host = "localhost";
const port = "4000";
const router = "v1";
const base_url = `http://${host}:${port}/${router}`;

function LoginApp() {

  //Setting the default details of the user to none
  const [user, setUser] = useState({ email: "", password: "" });
  //Setting the error
  const [error, setError] = useState("");

  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  //Checking if the user is logged in
  const Login = async (details) => {
    try {
      const response = await axios.post(`${base_url}/login`, details);
      localStorage.setItem('token', response.data.token)
      setUser({email: details.email});
      setIsLogged(true);
    } catch (error) {
      console.error(error);
      setIsLogged(false);
      setError("Les informations sont incorrectes !");
    }
    
  };

  return (
    <div>
      { isLogged ? <Redirect to="/calendar" /> : <LoginForm Login={Login} error={error} /> }
    </div>
  );
}

export default LoginApp;
