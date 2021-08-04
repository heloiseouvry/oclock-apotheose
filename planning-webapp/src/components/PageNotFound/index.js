import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./styles.scss";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>Error 404 </h1>
      <img
        src="https://media1.tenor.co/images/46e53c492931db75c414185910625a8d/tenor.gif?itemid=7689012&fbclid=IwAR1o0cfUFgknch2BDjdksFirURpIqSyJwmfDZGsEkP1P9EobjukFTRz4fSI"
        alt="Singer falling from a scene"
      />
      <h2>“Un voyage de mille lieues a commencé par un pas.” - <span className="quote-author">Proverbe chinois</span></h2>
      <Link to="/">
        <Button content="Accueil" secondary />
      </Link>
    </div>
  );
};

export default PageNotFound;
