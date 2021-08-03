import React from "react";
import { useState } from "react/cjs/react.development";
import { Link  } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import axios from "axios";

import "./styles.scss";

const host = "100.25.136.194";
const port = "4000";
const router = "v1";
const base_url = `http://${host}:${port}/${router}`;

function ForgotPassword() {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ email: ""});

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${base_url}/users`, details);
      
      if ( details ) {
        console.log('email ok');
      }
    } catch (error) {
      console.error(error);
      setError("Les informations sont incorrectes !");
    }
  };

  return (
    <div className="LoginForm">
      <h1 className="title">Mot de passe oublié</h1>
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
        <div className="connect">
          <Button
            type="submit"
            className="button"
            content="Envoyer"
            primary
          />
          {error != "" ? <div className="error">{error}</div> : ""}
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

export default ForgotPassword;
