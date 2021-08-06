import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import { slide as Menu } from "react-burger-menu";

import "./styles.scss";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "2px",
    top: "65px",
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


class TechNavbar extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <nav className="tech-navbar">
        <nav className="technav-desktop">
        <Link to ="/tech/calendar">
          <Button inverted content="Planning" />
        </Link>
        <Link to ="/tech/salaryreport">
          <Button inverted content="Synthèse des salaires" />
        </Link>
        </nav>

        <nav className="technav-mobile">
          <Menu
            onClick={this.showSettings}
            right
            styles={styles}
            disableAutoFocus
          >
            <Link to="/tech/calendar">
              <div id="calendar" className="menu-item" href="/tech/calendar">
                Planning
              </div>
            </Link>
            <Link to="/tech/salaryreport">
              <div id="viewtech" className="menu-item" href="/tech/salaryreport">
                Synthèse des salaires
              </div>
            </Link>
          </Menu>
        </nav>
      </nav>
    )
  }
};

export default TechNavbar;
