import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { Button } from "semantic-ui-react";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>Kapouévent</h1>
      <h2 className="slogan">
        Créez vos évènements, organisez et partagez au sein de votre équipe.
      </h2>
      <div>
        <Link to="/contact">
          <Button icon="mail" content="Nous contacter" secondary />
        </Link>
        {/* Here we use a link to redirect the user to the /login route   */}
        <Link to="/login">
          <Button icon="sign-in" content="Se connecter" primary />
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
