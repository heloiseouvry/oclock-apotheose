import React, { useState } from "react";
import LoginForm from "./index";
import Calendar from "../Calendar";
import axios from "axios";

function LoginApp() {

  //Setting the default details of the user to none
  const [user, setUser] = useState({ email: "", password: "" });
  //Setting the error
  const [error, setError] = useState("");

  //Checking if the user is logged in
  const Login = async (details) => {
    try {
      const response = await axios.post("http://localhost:4000/v1/login", details);
      // localStorage.setItem('token', response.data.token)
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
      {user.email != "" ? (
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
