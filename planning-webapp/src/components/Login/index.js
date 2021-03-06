import React from "react";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Divider } from "semantic-ui-react";
import axios from "axios";

import "./styles.scss";

import {router_url} from "../../../config/dbConf";

function Login() {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${router_url}/login`, details);
      // localStorage.setItem permit to stock pair key / value
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      setIsLogged(true);
      if (response.data.role === "tech") {
        history.push("/tech/calendar");
      } else {
        history.push("/calendar");
      }
    } catch (error) {
      console.error(error);
      setIsLogged(false);
      setError("Les informations sont incorrectes !");
    }
  };

  return (
    <div className="login-page">
      <h1>Se connecter</h1>
      <form className="login-form" method="POST" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) =>
            setDetails({ ...details, email: event.target.value })
          }
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) =>
            setDetails({ ...details, password: event.target.value })
          }
        />

        <div className="rememberme">
          <input
            type="checkbox"
            id="rememberme"
            onChange={(_, data) =>
              setDetails({ ...details, rememberme: data.checked })
            }
          />
          <label htmlFor="rememberme">Se souvenir de moi</label>
        </div>

        <Button
          type="submit"
          className="button"
          content="Se connecter"
          primary
        />
        {error != "" ? <div className="error">{error}</div> : ""}
        <a className="forgottenPassword" href="/forgottenpassword">
          Mot de passe oubli???
        </a>
      </form>

      <hr className="login-divider" />

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
