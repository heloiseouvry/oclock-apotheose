import React, {useState, useEffect} from 'react';
import { Button, Checkbox, Form, FormGroup, Radio, TextArea } from 'semantic-ui-react';
import axios from "axios";

import './styles.scss';

const host = "100.25.136.194";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

function AddTech ({tech, onDelete}) {
  console.log("tech", tech);

  const [error, setError] = useState("");
  const [addTechForm, setAddTech] = useState({ lastname: "Martin", firstname: "Jean-Eudes", phone_number: "0606060606", role: "tech", email: "jem@gmail.com", password: "micdrop", status: "", birth_date: "1980-11-29", birth_city: "Reims", birth_department: "51", ssn: "1801151105278", intermittent_registration: "", legal_entity: "", siret: "", emergency_contact: "Obama", emergency_phone_number: "0707070707", comments:"Ras", address_id:null});
  const [addJob, setAddJob] = useState({1: false, 2: false, 3: false, 4: false});
  const [addAddress, setAddAddress] = useState({main: "12 rue de la soif", additional: "", zip_code: "51100", city: "Reims"})

  // google research : load data in use state by props react
  // https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props

  useEffect(()=>{
    console.log("AddTech::use Effect");
    if(tech) {
      setAddTech({
        lastname: tech.lastname,
        firstname: tech.firstname,
        phone_number: tech.phone_number,
        role: tech.role,
        email: tech.email,
        password: tech.password,
        status: tech.status,
        birth_date: tech.birth_date,
        birth_city: tech.birth_city,
        birth_department: tech.birth_department,
        ssn: tech.ssn,
        intermittent_registration: tech.intermittent_registration,
        legal_entity: tech.legal_entity,
        siret: tech.siret,
        emergency_contact: tech.emergency_contact,
        emergency_phone_number: tech.emergency_phone_number,
        comments: tech.comments,
        address_id: tech.address_id
      });
      initAddJob(tech);
      setAddAddress(tech);
    }
  },[tech]);

  // TODO
  const initAddJob = async (tech) => {
    // TODO récupérer les jobs du user et les set
    /*
    try {
      const addressResponse = await axios.get(`${base_url}/METTRE LA ROUTE DES JOBS`, addAddress,{
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
      });
    } catch (error) {
    console.error(error);
    setError("Les informations sont incorrectes !");
    }
    */
    setAddJob({1: false, 2: false, 3: false, 4: false});
  };

  const initAddAddress = async (tech) => {
    // TODO récupérer l'adresse du user et les set
    try {
      const addressResponse = await axios.get(`${base_url}/address/${tech.address_id}`,{
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
      });
    } catch (error) {
    console.error(error);
    setError("Les informations sont incorrectes !");
    }


    setAddAddress({main: " ", additional: " ", zip_code: " ", city: " "});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const addressResponse = await axios.post(`${base_url}/address`, addAddress,{
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
      });
      addTechForm.address_id = addressResponse.data.id;
      console.log("handlesubmit", addTechForm);
      const userResponse = await axios.post(`${base_url}/users`, addTechForm,{
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
      });
      const user_id = userResponse.data.id;
      console.log("addJob", addJob);

      let finalJobs = [];

      for (const [key, value] of Object.entries(addJob)) {
        if (value === true)
          finalJobs.push(key);
      }

      const userHasJobResponse = await axios.post(`${base_url}/userhasjob/${user_id}`, finalJobs,{
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
      });

      console.log(userHasJobResponse)
      
    } catch (error) {
    console.error(error);
    setError("Les informations sont incorrectes !");
    }
  };
  
  const [interChecked, setInterChecked] = useState(true)
  const [prestaChecked, setPrestaChecked] = useState(false)
  
  

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
                  <label htmlFor="password">Mot de passe</label>
                  <input id="password" type='text' value={addTechForm.password} onChange={(event) => setAddTech({ ...addTechForm, password: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="ssn">N° de sécurité sociale</label>
                  <input id="ssn" type='text' value={addTechForm.ssn} onChange={(event) => setAddTech({ ...addTechForm, ssn: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="role">Rôle</label>
                  <input id="role" type='text' value={addTechForm.role} disabled onChange={(event) => setAddTech({ ...addTechForm, role: event.target.value })}/>               
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
                  <input id="main" type='text' value={addAddress.main} onChange={(event) => setAddAddress({ ...addAddress, main: event.target.value })}/>               
                </Form.Field>
                <Form.Field >
                  <label htmlFor="additional">Complément d'adresse</label>
                  <input id="additional" type='text' value={addAddress.additional} onChange={(event) => setAddAddress({ ...addAddress, additional: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="zip_code">Code postal</label>
                  <input id="zip_code" type='text' value={addAddress.zip_code} onChange={(event) => setAddAddress({ ...addAddress, zip_code: event.target.value })}/>               
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="city">Ville</label>
                  <input id="city" type='text' value={addAddress.city} onChange={(event) => setAddAddress({ ...addAddress, city: event.target.value })}/>               
                </Form.Field>
              </Form.Group>

              <Form.Group >
                <label><h3>Le statut :</h3></label>
                  <Form.Field>
                    <Radio
                    id='intermittent' name='radioGroup' label= 'Intermittent' checked ={interChecked} onChange={(event) => {
                      setAddTech({ ...addTechForm, status: event.target.id });
                      console.log(event.target.checked);
                      // setSwitchStatus({intermittent:true, prestataire:false});
                      // isChecked();
                      setInterChecked(true);
                      setPrestaChecked(false);
                      // console.log(interChecked,prestaChecked);
                      // setIsIntermittent();
                    }}  />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                    id='prestataire' name='radioGroup' label='Prestataire' checked={prestaChecked}  onChange={(event) => {
                      setAddTech({ ...addTechForm, status: event.target.id });
                      console.log(event.target);
                      // setSwitchStatus({intermittent:false, prestataire:true});
                      //isChecked();
                      setInterChecked(false);
                      setPrestaChecked(true);
                     // setIsIntermittent();
                    }}  />
                  </Form.Field>
              </Form.Group>

              <Form.Group>
                <Form.Field name='prestataire'>
                  <label htmlFor="legal_entity">Raison social</label>
                  <input id="legal_entity" type='text' disabled={interChecked} value={addTechForm.legal_entity}  onChange={(event) => setAddTech({ ...addTechForm, legal_entity: event.target.value })} />               
                  
                </Form.Field>
                <Form.Field name='prestataire'>
                  <label htmlFor="siret">N° de siret</label>
                  <input id="siret" type='text' value={addTechForm.siret} disabled={interChecked} onChange={(event) => setAddTech({ ...addTechForm, siret: event.target.value })} />               
                </Form.Field>
                <Form.Field name='intermittent'>
                  <label htmlFor="intermittent_registration">N° Congé Spectacle</label>
                  <input id="intermittent_registration" type='text' value={addTechForm.intermittent_registration} disabled={prestaChecked} onChange={(event) => setAddTech({ ...addTechForm, intermittent_registration: event.target.value })}/>               
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <label><h3>Métier :</h3></label>
                  <Form.Field>
                  <Checkbox label='Son' value='1' onChange={(event, data)=>setAddJob({...addJob, [data.value]: data.checked})} />
                  <Checkbox label='Lumière' value='2' onChange={(event, data)=>setAddJob({...addJob, [data.value]: data.checked})} />
                  <Checkbox label='Vidéo' value='3' onChange={(event, data)=>setAddJob({...addJob, [data.value]: data.checked})} />
                  <Checkbox label='Autre' value='4' onChange={(event, data)=>setAddJob({...addJob, [data.value]: data.checked})} />
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
            <div>
              <Button className='button' content='Supprimer' 
                style={!tech ? {display: "none"} : {} }
                onClick={() => onDelete(tech)} />
            </div>
        </div>
    )
};

export default AddTech;
