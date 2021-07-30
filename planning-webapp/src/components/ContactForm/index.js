import React from "react";
import { Link }   from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Checkbox } from "semantic-ui-react";
//import EmailJS
import emailjs from 'emailjs-com';


import "./styles.scss";
  
const ContactForm = () =>{ 


  function handleSubmit(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_kapouevent",
      "template_6nihwuo",
      e.target,
      "user_G9TPGoLJfduwUzmSUTmvP"
    );
    e.target.reset(); 
  }
  

  return (
    <div className="LoginForm">
      <h1 className="title">Nous contacter</h1>

      <form onSubmit={handleSubmit} className="inputForm" method="POST">
        <div className="contactDiv">
          <div className="contactInfo">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Votre nom"
            />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Votre prenom"
            />
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Votre entreprise"
            />
          </div>
          <div className="contactInfo">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
            />
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Votre numéro"
            />
          </div>
        </div>
        <textarea
          className="comment"
          type="text"
          id="message"
          name="message"
          placeholder="Laissez un commentaire (500 charactère maximum)"
          maxLength="2000"
        />
        
        <div className="connect">
          <Button
            type="submit"
            className="button"
            content="Envoyer"
            primary
          />
        </div>
        
      </form>

      

      <div className="demo">
        <p>Vous avez déjà un compte? Connectez-vous!</p>
        <Link to="/login">
          <Button content="Se connecter" secondary />
        </Link>
      </div>
    </div>
  );
}

export default ContactForm;
