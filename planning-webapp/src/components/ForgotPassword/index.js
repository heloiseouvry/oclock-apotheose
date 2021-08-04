import React from "react";
import { Link  } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import emailjs from "emailjs-com";

import "./styles.scss";



const ForgotPassword = () => {
    function handleSubmit(e) {
        e.preventDefault();
    
        emailjs.sendForm(
          "service_kapouevent",
          "template_06ycjoe",
          e.target,
          "user_G9TPGoLJfduwUzmSUTmvP"
        );
        e.target.reset(); 
        document.getElementById("successMessage").style.display="block"
      }
      
    
      return (
        <div className="ForgotForm">
          <h1 className="title">Vous avez oublié votre mot de passe?</h1>
    
          <form onSubmit={handleSubmit} className="inputForm" method="POST">
            <div className="contactDiv">
              
              <div className="contactInfo">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre email"
                  required/>
              </div>
            </div>            
            <div className="connect">
              <Button type="submit" className="button" content="Envoyer" primary />
            </div>
            <div id='successMessage' className='successMessage'>
              <p>Votre demande a bien été envoyée, nous vous contacterons dans les plus brefs délais !</p>
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
    };

export default ForgotPassword;
