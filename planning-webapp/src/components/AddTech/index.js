import React, {useState} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from "axios";

import './styles.scss';

const host = "localhost";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

function AddTech () {

  const [error, setError] = useState("");
  const [eventForm, setAddTech] = useState({ lastname: "", firstname: "", phone_number: "", role: "", email: "", password: "", status: "", birth_date: "", birth_city: "", birth_department: "", ssn: "", intermittent_registration: "", legal_entity: "", siret: "", emergency_contact: "", emergency_phone_number: "", comments:""});

  const handleSubmit = async (event) => {}

    return(
        <div className='CreateTech'>
        <h1 className='title'>Ajouter un technicien</h1>
                            
            <Form onSubmit={handleSubmit}> 
              <Form.Group>
                <Form.Field required>
                  <label htmlFor="lastname">Nom</label>
                  <input id="lastname" type='text' value={eventForm.lastname} onChange={(event) => setAddTech({ ...addTechForm, lastname: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="firstname">Prénom</label>
                  <input id="firstname" type='text' value={eventForm.firstname} onChange={(event) => setAddTech({ ...addTechForm, firstname: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="phone_number">N° téléphone</label>
                  <input id="phone_number" type='text' value={eventForm.lastname} onChange={(event) => setAddTech({ ...addTechForm, phone_number: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="email">email</label>
                  <input id="email" type='email' value={eventForm.email} onChange={(event) => setAddTech({ ...addTechForm, email: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="birth_date">Date de naissance</label>
                  <input id="birth_date" type='date' value={eventForm.birth_date} onChange={(event) => setAddTech({ ...addTechForm, birth_date: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="lastname">Nom</label>
                  <input id="lastname" type='text' value={eventForm.lastname} onChange={(event) => setAddTech({ ...addTechForm, lastname: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="lastname">Nom</label>
                  <input id="lastname" type='text' value={eventForm.lastname} onChange={(event) => setAddTech({ ...addTechForm, lastname: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="lastname">Nom</label>
                  <input id="lastname" type='text' value={eventForm.lastname} onChange={(event) => setAddTech({ ...addTechForm, lastname: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="lastname">Nom</label>
                  <input id="lastname" type='text' value={eventForm.lastname} onChange={(event) => setAddTech({ ...addTechForm, lastname: event.target.value })}/>               
                </Form.Field>
                <input type="text" placeholder='Prénom' />
                <input type='text' placeholder='Adresse' />               
                <input type="text" placeholder='Code postale' />
                <input type='text' placeholder='Ville' />               
                <input type="text" placeholder='Téléphone' />
                <input type='email' placeholder='Email' />
              </Form.Group>
                    <select className='statut' name="pets" id="pet-select">
                        <option value="">Quelle est son status?</option>
                        <option value="dog">Intermitant</option>
                        <option value="cat">Prestataire</option>
                    </select>

                <label className='datePicker' htmlFor="start">Date de naissance:</label> 
                <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" /> 

                <input type="text" placeholder='Code Postale de Naissance' />
                <input type='text' placeholder='Ville de Naissance' />               
                <input type="text" placeholder='N° de Sécurité Sociale' />
                <input type='text' placeholder='N° de Congé de spectacle' />               
                <input type="text" placeholder='Raison Sociale' />
                <input type='text' placeholder='N° de Siret' />               
                <input type="text" placeholder='Commentaire suplémentaire?' />

                <Checkbox className='checkbox' label='Son' />
                <Checkbox className='checkbox' label='Lumiere' />
                <Checkbox className='checkbox' label='Video' />
                <Checkbox className='checkbox' label='Autre' />           
                
            
                <div className='Submit-Tech' >
                    <Button type='submit' className='button' content='Se connecter' primary />
                    
                </div>
            </Form>
        </div>
    )
};

export default AddTech;
