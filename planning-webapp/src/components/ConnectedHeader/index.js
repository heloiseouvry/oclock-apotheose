import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import AdminNavbar from "../AdminNavbar";
import TechNavbar from "../TechNavbar";

import "./styles.scss";


const ConnectedHeader = ({role}) => {
  const isAdmin = (role === "cdp") ? true : false;
  const history = useHistory();

  function logout() {
    localStorage.removeItem("token");
    history.push('login');
  }
  return (
    <header className="connected-header">
      <Link to="/">
        <img src="https://img.icons8.com/ios/100/000000/health-calendar.png" />
        <h1 className="title">Kapouévent</h1>
      </Link>
      { isAdmin ? <AdminNavbar /> : <TechNavbar /> }
      <Button
        className="logout"
        content="Déconnexion"
        icon="log out"
        onClick={logout}
      />
    </header>
  );
};

export default ConnectedHeader;
