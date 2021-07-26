import React, { useState } from "react";
import LoginForm from "./index";
import Calendar from "../Calendar";
import axios from "axios";

const host = "localhost";
const port = "4000";
const router = "v1";
const base_url = `http://${host}:${port}/${router}`;

function LoginApp() {

  //Setting the default details of the user to none
  const [user, setUser] = useState({ email: "", password: "" });
  //Setting the error
  const [error, setError] = useState("");

  //Checking if the user is logged in
  const Login = async (details) => {
    try {
      const response = await axios.post(`${base_url}/login`, details);
      localStorage.setItem('token', response.data.token)
      setUser({email: details.email});
    } catch (error) {
      console.error(error);
      setError("Les informations sont incorrectes !");
    }
    
  };
  //Logging out and setting the user default to none
  const Logout = () => {
    setUser({ email: "", password: "" });
  };

  return (
    <div>
      {localStorage.getItem('token') ? (
        // (1)Once we are logged in we render Calendar
        <Calendar />
      ) : (
        // (1)if we have an error then we render the error message
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default LoginApp;
