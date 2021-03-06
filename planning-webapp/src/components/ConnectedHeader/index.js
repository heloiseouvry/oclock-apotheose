import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import AdminNavbar from "../AdminNavbar";
import TechNavbar from "../TechNavbar";

import "./styles.scss";

const ConnectedHeader = () => {
  const isAdmin = (localStorage.getItem("role") === "cdp") ? true : false;
  const history = useHistory();

  function logout() {
    localStorage.removeItem("token");
    history.push('/login');
  }
  return (
    <header className={ isAdmin ? "connected-header" : "dark-connected-header" }>
      <Link to="/">
        <h1 className="title">Kapouévent</h1>
      </Link>
      { isAdmin ? <AdminNavbar /> : <TechNavbar /> }
      <Button
        className="logout"
        content="Déconnexion"
        icon="log out"
        inverted = { isAdmin ? false : true }
        onClick={logout}
      />
    </header>
  );
};

export default ConnectedHeader;
