import React, {useState} from 'react';
import { Button, Form  } from 'semantic-ui-react';
// import SemanticDatepicker from 'semantic-ui-calendar';

import './styles.scss';

const host = "localhost";
const port = "4000";
const router = "v1";
const base_url = `http://${host}:${port}/${router}`;

function EventForm ({startTime, endTime}) {
  const start_date = `${startTime.getFullYear()}-${("0" + (startTime.getMonth() + 1)).slice(-2)}-${("0" + startTime.getDate()).slice(-2)}`;
  const start_time = `${("0" + startTime.getHours()).slice(-2)}:${("0" + startTime.getMinutes()).slice(-2)}`;

  const end_date = `${endTime.getFullYear()}-${("0" + (endTime.getMonth() + 1)).slice(-2)}-${("0" + endTime.getDate()).slice(-2)}`;
  const end_time = `${("0" + endTime.getHours()).slice(-2)}:${("0" + endTime.getMinutes()).slice(-2)}`;

  const [eventForm, setEventForm] = useState({ title: "", start_date, end_date, start_time, end_time, color: "", address: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${base_url}/events`, eventForm, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      console.error(error);
      setError("Les informations sont incorrectes !");
    }
  };

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Nom de l'évenement</label>
              <input placeholder="Nom de l'évenement" name="title"/>
            </Form.Field>

            <Form.Field>
              <label className='datePicker' htmlFor="start_date">Début</label> 
              <input id="start_date" type="date" name="start_date" min="1900-01-01" max="2100-12-31" value={eventForm.start_date} onChange={(event) => 
                setEventForm({ ...eventForm, start_date: event.target.value })}/> 
            </Form.Field>

            <Form.Field>
              <label className='datePicker' htmlFor="end_date">Fin</label> 
              <input id="end_date" type="date" name="end_date" min="1900-01-01" max="2100-12-31" value={eventForm.end_date} onChange={(event) =>
            setEventForm({ ...eventForm, end_date: event.target.value })
          }/> 
            </Form.Field>

            <Form.Field>
              <label htmlFor="start_hour">Heure de Début:</label>
              <input type="time" name="start_hour" id="start_hour" value={eventForm.start_time} onChange={(event) =>
            setEventForm({ ...eventForm, start_time: event.target.value })
          }/>  
            </Form.Field>
            <Form.Field>
              <label htmlFor="end_hour">Heure de Fin:</label>
              <input type="time" name="end_hour" id="end_hour" value={eventForm.end_time} onChange={(event) =>
            setEventForm({ ...eventForm, end_time: event.target.value })
          }/>  
            </Form.Field>   

            <Form.Field><input type='text' placeholder='Adresse' name="main_adress"/></Form.Field>            
            <Form.Field><input type="text" placeholder='Code postal' name="zipcode"/></Form.Field>
            <Form.Field><input type='text' placeholder='Ville' name="city"/></Form.Field>      
                
                <div className='Submit-Tech' >
                    <Button type='submit' className='button' content="Créer l'event" primary />
                </div>
            </Form>
    )
};

export default EventForm;
