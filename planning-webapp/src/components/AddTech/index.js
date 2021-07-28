import React, {useState} from 'react';
import { Button, Checkbox, Form, FormGroup, Radio, TextArea } from 'semantic-ui-react';
import axios from "axios";

import './styles.scss';

const host = "localhost";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

function AddTech () {

  const [error, setError] = useState("");
  const [addTechForm, setAddTech] = useState({ lastname: "", firstname: "", phone_number: "", role: "", email: "", password: "", status: "", birth_date: "", birth_city: "", birth_department: "", ssn: "", intermittent_registration: "", legal_entity: "", siret: "", emergency_contact: "", emergency_phone_number: "", comments:""});

  const handleSubmit = async (event) => {};

  const [radioButton, setButton] = useState({intermittentDisable:false, prestataireDisable:false})

    return(
        <div className='CreateTech'>
        <h1 className='title'>Ajouter un technicien</h1>
                            
            <Form onSubmit={handleSubmit}> 
              <Form.Group>
                <Form.Field required>
                  <label htmlFor="lastname">Nom</label>
                  <input id="lastname" type='text' value={addTechForm.lastname} onChange={(event) => setAddTech({ ...addTechForm, lastname: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="firstname">Prénom</label>
                  <input id="firstname" type='text' value={addTechForm.firstname} onChange={(event) => setAddTech({ ...addTechForm, firstname: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="phone_number">N° téléphone</label>
                  <input id="phone_number" type='text' value={addTechForm.phone_number} onChange={(event) => setAddTech({ ...addTechForm, phone_number: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="email">email</label>
                  <input id="email" type='email' value={addTechForm.email} onChange={(event) => setAddTech({ ...addTechForm, email: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="ssn">N° de sécurité sociale</label>
                  <input id="ssn" type='text' value={addTechForm.ssn} onChange={(event) => setAddTech({ ...addTechForm, ssn: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="role">Rôle</label>
                  <input id="role" type='text' value={addTechForm.role} onChange={(event) => setAddTech({ ...addTechForm, role: event.target.value })}/>               
                </Form.Field>
              </Form.Group>

              <Form.Group>
                <Form.Field required>
                  <label htmlFor="birth_date">Date de naissance</label>
                  <input id="birth_date" type='date' value={addTechForm.birth_date} onChange={(event) => setAddTech({ ...addTechForm, birth_date: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="birth_city">Ville de naissance</label>
                  <input id="birth_city" type='text' value={addTechForm.birth_city} onChange={(event) => setAddTech({ ...addTechForm, birth_city: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="birth_department">N° du département de naissance</label>
                  <input id="birth_department" type='text' value={addTechForm.birth_department} onChange={(event) => setAddTech({ ...addTechForm, birth_department: event.target.value })}/>               
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field required>
                  <label htmlFor="emergency_contact">Nom du contact en cas d'urgence</label>
                  <input id="emergency_contact" type='text' value={addTechForm.emergency_contact} onChange={(event) => setAddTech({ ...addTechForm, emergency_contact: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="emergency_phone_number">N° de téléphone du contact</label>
                  <input id="emergency_phone_number" type='text' value={addTechForm.emergency_phone_number} onChange={(event) => setAddTech({ ...addTechForm, emergency_phone_number: event.target.value })}/>               
                </Form.Field>
              </Form.Group>
              <Form.Group >
                <Form.Field required>
                  <label htmlFor="main">Adresse principale</label>
                  <input id="main" type='text' value={addTechForm.main} onChange={(event) => setAddTech({ ...addTechForm, main: event.target.value })}/>               
                </Form.Field>
                <Form.Field >
                  <label htmlFor="additional">Complément d'adresse</label>
                  <input id="additional" type='text' value={addTechForm.additional} onChange={(event) => setAddTech({ ...addTechForm, additional: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="zip_code">Code postal</label>
                  <input id="zip_code" type='text' value={addTechForm.zip_code} onChange={(event) => setAddTech({ ...addTechForm, zip_code: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="city">Ville</label>
                  <input id="city" type='text' value={addTechForm.city} onChange={(event) => setAddTech({ ...addTechForm, city: event.target.value })}/>               
                </Form.Field>
              </Form.Group>

              <Form.Group inline>
                <label><h3>Le statut :</h3></label>
                  <Form.Field>
                    <Radio
                    id='intermittent' name='radioGroup' label= 'Intermittent' value={addTechForm.status} onChange={(event) => {
                      setAddTech({ ...addTechForm, status: event.target.value });
                      
                      setButton(radioButton.intermittentDisable=false, radioButton.prestataireDisable=true);
                    }}  />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                    id='prestataire' name='radioGroup' label='Prestataire' value={addTechForm.status} onChange={(event) => {
                      setAddTech({ ...addTechForm, status: event.target.value });
                      
                      setButton(radioButton.intermittentDisable=true, radioButton.prestataireDisable=false);
                    }}  />
                  </Form.Field>
              </Form.Group>

              <Form.Group>
                <Form.Field name='prestataire'>
                  <label htmlFor="legal_entity">Raison social</label>
                  <input id="legal_entity" type='text' disabled={radioButton.prestataireDisable} value={addTechForm.legal_entity}  onChange={(event) => setAddTech({ ...addTechForm, legal_entity: event.target.value })} />               
                  
                </Form.Field>
                <Form.Field name='prestataire'>
                  <label htmlFor="siret">N° de siret</label>
                  <input id="siret" type='text' value={addTechForm.siret} disabled={radioButton.prestataireDisable} onChange={(event) => setAddTech({ ...addTechForm, siret: event.target.value })} />               
                </Form.Field>
                <Form.Field name='intermittent'>
                  <label htmlFor="intermittent_registration">N° Congé Spectacle</label>
                  <input id="intermittent_registration" type='text' value={addTechForm.intermittent_registration} disabled={radioButton.intermittentDisable} onChange={(event) => setAddTech({ ...addTechForm, intermittent_registration: event.target.value })}/>               
                </Form.Field>
              </Form.Group>
                    
              <Form.Group >
                <Form.Field>
                  <label>Commentaires / Remarques</label>
                </Form.Field>
                <TextArea
                  placeholder= 'Inscrivez vos commentaires'  
                  id="comments" value={addTechForm.comments} onChange={(event) => setAddTech({ ...addTechForm, comments: event.target.value })}/> 
                             
                </Form.Group>
                
            
                <div className='Submit-Tech' >
                    <Button type='submit' className='button' content='Valider' primary />
                    
                </div>
            </Form>
        </div>
    )
};

export default AddTech;
