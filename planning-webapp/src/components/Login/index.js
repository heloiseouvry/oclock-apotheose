import React from "react";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";
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

        <Checkbox label="Se souvenir de moi" />

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
