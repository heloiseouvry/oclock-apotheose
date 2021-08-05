import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { slide as Menu } from "react-burger-menu";

import "./styles.scss";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "10px",
    top: "100px",
  },
  bmBurgerBars: {
    background: "#b5b5b5",
  },
  bmMenuWrap: {
    height: "100%",
  },
  bmMenu: {
    background: "#333333",
    padding: "1.5rem",
    fontSize: "1.2rem",
  },
};

class AdminNavbar extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <nav className="admin-navbar">
        <nav className="nav-desktop">
          <Link to="/calendar">
            <Button content="Planning" />
          </Link>
          <Link to="/addtech">
            <Button content="Ajouter un technicien" />
          </Link>
          <Link to="/viewtech">
            <Button content="Consulter le profil d'un technicien" />
          </Link>
          <Link to="/techlist">
            <Button content="Gestion des techniciens" />
          </Link>
          <Link to="/salaryreport">
            <Button content="Synthèse des salaires" />
          </Link>
        </nav>

        <nav className="nav-mobile">
          <Menu
            onClick={this.showSettings}
            right
            styles={styles}
            disableAutoFocus
          >
            <Link to="/calendar">
              <div id="calendar" className="menu-item" href="/calendar">
                Planning
              </div>
            </Link>
            <Link to="/addtech">
              <div id="addtech" className="menu-item" href="/addtech">
                Ajouter un technicien
              </div>
            </Link>
            <Link to="/viewtech">
              <div id="viewtech" className="menu-item" href="/viewtech">
                Consulter le profil d'un technicien
              </div>
            </Link>
            <Link to="/salaryreport">
              <div id="viewtech" className="menu-item" href="/salaryreport">
                Synthèse des salaires
              </div>
            </Link>
          </Menu>
        </nav>
      </nav>
    );
  }
}

export default AdminNavbar;
