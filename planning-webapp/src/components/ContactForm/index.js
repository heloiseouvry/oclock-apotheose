import React from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox } from "semantic-ui-react";
import emailjs from "emailjs-com";

import "./styles.scss";

const ContactForm = () => {
  function handleSubmit(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_kapouevent",
      "template_6nihwuo",
      e.target,
      "user_G9TPGoLJfduwUzmSUTmvP"
    );
    e.target.reset();
    document.getElementById("successMessage").style.display = "block";
  }

  return (
    <div className="contact-page">
      <h1>Nous contacter</h1>

      <form onSubmit={handleSubmit} className="contact-form" method="POST">
        <section className="contact-info">
          <input type="text" id="lastName" name="lastName" placeholder="Nom" required/>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Prénom"
            required/>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Nom de votre entreprise"
            />
          <input type="email" id="email" name="email" placeholder="Email" required/>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Numéro de téléphone"
            required/>
        </section>
        <textarea
          type="text"
          id="message"
          name="message"
          placeholder="Laissez un commentaire"
        />

        <Button type="submit" content="Envoyer" primary />

        <p id="successMessage" className="successMessage">
          Votre message a bien été envoyé
        </p>
        
      </form>

      <div className="demo">
        <p>Vous avez déjà un compte? Connectez-vous!</p>
        <Link to="/login">
          <Button content="Se connecter" secondary />
        </Link>
      </div>
    </div>
  );
};

export default ContactForm;
