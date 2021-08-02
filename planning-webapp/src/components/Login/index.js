import React from "react";
import { useState } from "react/cjs/react.development";
import { Link, useHistory  } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Checkbox } from "semantic-ui-react";
import axios from "axios";

import "./styles.scss";

const host = "100.25.136.194";
const port = "4000";
const router = "v1";
const base_url = `http://${host}:${port}/${router}`;

function Login() {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ email: "", password: "" });
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${base_url}/login`, details);
      // localStorage.setItem permit to stock pair key / value
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      setIsLogged(true);
      console.log("history", history.location);
      if (response.data.role === "tech") {
        history.push('/tech/calendar')
      }
      else  {
        history.push('/calendar');
      }
    } catch (error) {
      console.error(error);
      setIsLogged(false);
      setError("Les informations sont incorrectes !");
    }
  };

  return (
    <div className="LoginForm">
      <h1 className="title">Se connecter</h1>
      {/* // (1)When the form will be submitted it will pass the pass the information to submitHandler  */}
      <form className="inputForm" method="POST" onSubmit={submitHandler}>
        {/* // Here we collect the detailled data of the email and password input    */}
        <input
          type="email"
          placeholder="Email"
          onChange={(event) =>
            setDetails({ ...details, email: event.target.value })
          }
        />
        <br></br>
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) =>
            setDetails({ ...details, password: event.target.value })
          }
        />

        <Checkbox className="checkbox" label="Se souvenir de moi" />

        <div className="connect">
          <Button
            type="submit"
            className="button"
            content="Se connecter"
            primary
          />
          {error != "" ? <div className="error">{error}</div> : ""}
          <a className="forgottenPassword" href="/">
            Mot de passe oublié?
          </a>
        </div>
      </form>
      <div className="demo">
        <p>Voulez-vous essayer notre application?</p>
        <Link to="/contact">
          <Button content="Nous contacter" secondary />
        </Link>
      </div>
    </div>
  );
}

export default Login;
