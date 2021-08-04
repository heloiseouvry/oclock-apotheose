import React from "react";

import "./styles.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>Qui sommes-nous?</p>
      <div className="team">
        <a
          className="logoEquipe"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/YannSinbad"
        >
          <img src="https://avatars.githubusercontent.com/u/78867631?v=4&size=70" />
          Yann
        </a>
        <a
          className="logoEquipe"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/heloiseouvry"
        >
          <img src="https://avatars.githubusercontent.com/u/78724515?v=4&size=70" />
          Heloïse
        </a>
        <a
          className="logoEquipe"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/FredericDosSantos"
        >
          <img src="https://avatars.githubusercontent.com/u/62216728?v=4&size=70" />
          Fred
        </a>
        <a
          className="logoEquipe"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nadegesinbad"
        >
          <img src="https://avatars.githubusercontent.com/u/79319592?v=4&size=70" />
          Nadège
        </a>
      </div>
      <div className="copyright">Copyright ⓒ {currentYear}</div>
    </footer>
  );
};

export default Footer;
