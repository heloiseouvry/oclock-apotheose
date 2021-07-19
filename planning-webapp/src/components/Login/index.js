import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

import './style.scss';

const LoginForm = ({
  email,
  password,
  changeField,
  handleLogin,
  handleLogout,
  isLogged,
  loggedMessage,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-form">
      {isLogged && (
        <div className="login-form-logged">
          <p className="login-form-message">
            {loggedMessage}
          </p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      )}
      {!isLogged && (

        <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
          <Field
            name="email"
            placeholder="Adresse Email"
            onChange={changeField}
            value={email}
          />
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={changeField}
            value={password}
          />
          <button
            type="submit"
            className="login-form-button"
          >
            OK
          </button>
        </form>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  // Valeur du champ email
  email: PropTypes.string.isRequired,
  // Valeur du champ password
  password: PropTypes.string.isRequired,
  // Fonction permettant de modifier les valeurs des champs
  // Elle donne 2 paramètres, la valeur et le nom du champ
  changeField: PropTypes.func.isRequired,
  // Fonction déclenchée à la soumission du formulaire de connexion
  handleLogin: PropTypes.func.isRequired,
  // Fonction déclenchée au clic du bouton déconnexion
  handleLogout: PropTypes.func.isRequired,
  // Booléen qui représente l'état connecté/déconnecté
  isLogged: PropTypes.bool,
  // Message qui s'affiche quand on est connecté
  loggedMessage: PropTypes.string,
};

LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: 'Connecté',
};

export default LoginForm;