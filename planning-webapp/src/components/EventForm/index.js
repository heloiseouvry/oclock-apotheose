import React, {useState} from 'react';
import { Button, Form  } from 'semantic-ui-react';
// import SemanticDatepicker from 'semantic-ui-calendar';
import axios from "axios";

import './styles.scss';

const host = "localhost";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

function EventForm ({startTime, endTime}) {
  const start_date = `${startTime.getFullYear()}-${("0" + (startTime.getMonth() + 1)).slice(-2)}-${("0" + startTime.getDate()).slice(-2)}`;
  const start_time = `${("0" + startTime.getHours()).slice(-2)}:${("0" + startTime.getMinutes()).slice(-2)}`;

  const end_date = `${endTime.getFullYear()}-${("0" + (endTime.getMonth() + 1)).slice(-2)}-${("0" + endTime.getDate()).slice(-2)}`;
  const end_time = `${("0" + endTime.getHours()).slice(-2)}:${("0" + endTime.getMinutes()).slice(-2)}`;

  const [error, setError] = useState("");
  const [eventForm, setEventForm] = useState({ title: "", start_date, end_date, start_time, end_time, color: "#ffffff", main: "", additional: "", zip_code: "", city: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("eventForm", eventForm);
      
      const startParsedDate = new Date(Date.parse(`${eventForm.start_date}T${eventForm.start_time}:00`));
      const endParsedDate = new Date(Date.parse(`${eventForm.end_date}T${eventForm.end_time}:00`));
      const timeDiffInHours = (endParsedDate - startParsedDate)/1000/60/60;
      
      const body = {...eventForm};
      body.start_date = startParsedDate;
      body.duration = timeDiffInHours;
      console.log("body", body);

      const response = await axios.post(`${base_url}/events`, body, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      setError("Les informations sont incorrectes !");
    }
  };

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Nom de l'évenement</label>
              <input placeholder="Nom de l'évenement" name="title" onChange={(event) => 
                setEventForm({ ...eventForm, title: event.target.value })}/>
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

            <Form.Field>
              <label htmlFor="color">Couleur de l'événement:</label>
              <input type="color" name="color" id="color" value={eventForm.color} onChange={(event) =>
            setEventForm({ ...eventForm, color: event.target.value })
          }/>  
            </Form.Field>   

            <Form.Field>
              <input type='text' placeholder='Adresse principale' name="main" onChange={(event) =>
                setEventForm({ ...eventForm, main: event.target.value })}/>
            </Form.Field>            
            <Form.Field>
              <input type='text' placeholder="Complément d'adresse" name="additional" onChange={(event) =>
                setEventForm({ ...eventForm, additional: event.target.value })}/>
            </Form.Field>            
            <Form.Field>
              <input type="text" placeholder='Code postal' name="zip_code" onChange={(event) =>
                setEventForm({ ...eventForm, zip_code: event.target.value })}/>
            </Form.Field>
            <Form.Field>
              <input type='text' placeholder='Ville' name="city" onChange={(event) =>
                setEventForm({ ...eventForm, city: event.target.value })}/>
            </Form.Field>      
            {error != "" ? <div className="error">{error}</div> : ""}
                <div className='Submit-Tech' >
                    <Button type='submit' className='button' content="Créer l'event" primary />
                </div>
            </Form>
    )
};

export default EventForm;
