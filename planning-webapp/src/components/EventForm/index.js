import React, {useState} from 'react';
import { Button, Form  } from 'semantic-ui-react';
// import SemanticDatepicker from 'semantic-ui-calendar';
import axios from "axios";

import './styles.scss';

const host = "localhost";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

function EventForm ({eventInfo, eventEdit, setEventEdit, closeEventModal}) {
  // console.log("eventInfo", eventInfo);
  const start_date = `${eventInfo.start_date.getFullYear()}-${("0" + (eventInfo.start_date.getMonth() + 1)).slice(-2)}-${("0" + eventInfo.start_date.getDate()).slice(-2)}`;
  const start_time = `${("0" + eventInfo.start_date.getHours()).slice(-2)}:${("0" + eventInfo.start_date.getMinutes()).slice(-2)}`;

  const end_date = `${eventInfo.end_date.getFullYear()}-${("0" + (eventInfo.end_date.getMonth() + 1)).slice(-2)}-${("0" + eventInfo.end_date.getDate()).slice(-2)}`;
  const end_time = `${("0" + eventInfo.end_date.getHours()).slice(-2)}:${("0" + eventInfo.end_date.getMinutes()).slice(-2)}`;

  const [error, setError] = useState("");
  const [eventForm, setEventForm] = useState({ ...eventInfo, start_date, end_date, start_time, end_time });
  // console.log("eventForm", eventForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const startParsedDate = new Date(Date.parse(`${eventForm.start_date}T${eventForm.start_time}:00`));
      const endParsedDate = new Date(Date.parse(`${eventForm.end_date}T${eventForm.end_time}:00`));
      
      const eventBody = {...eventForm};
      eventBody.start_date = startParsedDate;
      eventBody.end_date = endParsedDate;
      eventBody.color = eventForm.bgColor;

      const addressBody = eventForm.raw.address;

      // console.log("eventBody", eventBody);
      // console.log("eventEdit", eventEdit);
      if(eventEdit){
        await axios.patch(`${base_url}/address/${addressBody.id}`, addressBody, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        eventBody.address_id = addressBody.id;
        const eventResponse = await axios.patch(`${base_url}/events/${eventBody.calendarId}`, eventBody, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        const phaseBody = {...eventBody, 
          event_id: eventResponse.data.event_id,
          type: 'event',
          number_fee: '0',
          user_id: eventResponse.data.user_id
        };
        await axios.patch(`${base_url}/phases/${eventResponse.data.id}`, phaseBody, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        setEventEdit(false);
      } else {
        const addressResponse = await axios.post(`${base_url}/address`, addressBody, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        eventBody.address_id = addressResponse.data.id;
        const eventResponse = await axios.post(`${base_url}/events`, eventBody, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        const phaseBody = {...eventBody, 
          event_id: eventResponse.data.id,
          type: 'event',
          number_fee: '0',
          user_id: eventResponse.data.user_id
        };
        await axios.post(`${base_url}/phases`, phaseBody, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
      }
      closeEventModal();
    } catch (error) {
      console.error(error);
      setError("Les informations sont incorrectes !");
    }
  };

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Field required>
              <label>Nom de l'évenement</label>
              <input placeholder="Nom de l'évenement" name="title" value={eventForm.title} onChange={(event) => 
              setEventForm({ ...eventForm, title: event.target.value })}/>
            </Form.Field>

            <Form.Group>
              <Form.Field required>
                <label htmlFor="start_date">Date de début</label> 
                <input id="start_date" type="date" name="start_date" min="1900-01-01" max="2100-12-31" value={eventForm.start_date} onChange={(event) => 
                  setEventForm({ ...eventForm, start_date: event.target.value })}/> 
              </Form.Field>
              <Form.Field required>
                <label htmlFor="start_hour">Heure de début</label>
                <input type="time" name="start_hour" id="start_hour" value={eventForm.start_time} onChange={(event) =>
              setEventForm({ ...eventForm, start_time: event.target.value })}/>  
              </Form.Field>
              <Form.Field required>
                <label htmlFor="end_date">Date de fin</label> 
                <input id="end_date" type="date" name="end_date" min="1900-01-01" max="2100-12-31" value={eventForm.end_date} onChange={(event) =>
              setEventForm({ ...eventForm, end_date: event.target.value })}/> 
              </Form.Field>
              <Form.Field required>
                <label htmlFor="end_hour">Heure de fin</label>
                <input type="time" name="end_hour" id="end_hour" value={eventForm.end_time} onChange={(event) =>
              setEventForm({ ...eventForm, end_time: event.target.value })}/>  
              </Form.Field>  
            </Form.Group>

            <Form.Field inline>
              <label htmlFor="color">Couleur de l'événement:</label>
              <input type="color" name="color" id="color" value={eventForm.bgColor} onChange={(event) =>
            setEventForm({ ...eventForm, bgColor: event.target.value })
          }/>  
            </Form.Field>   

              <Form.Field required>
                <input type='text' placeholder='Adresse principale' name="main" value={eventForm.raw.address.main} onChange={(event) =>
                setEventForm({ ...eventForm, raw: {...eventForm.raw, address: {...eventForm.raw.address, main: event.target.value} }})}/>
              </Form.Field>            
              <Form.Field>
                <input type='text' placeholder="Complément d'adresse" name="additional" value={eventForm.raw.address.additional} onChange={(event) =>
                  setEventForm({ ...eventForm, raw: {...eventForm.raw, address: {...eventForm.raw.address, additional: event.target.value} }})}/>
              </Form.Field> 
            <Form.Group>  
              <Form.Field required>
                <input type="text" placeholder='Code postal' name="zip_code" value={eventForm.raw.address.zip_code} onChange={(event) =>
                  setEventForm({ ...eventForm, raw: {...eventForm.raw, address: {...eventForm.raw.address, zip_code: event.target.value} }})}/>
              </Form.Field>
              <Form.Field required>
                <input type='text' placeholder='Ville' name="city" value={eventForm.raw.address.city} onChange={(event) =>
                  setEventForm({ ...eventForm, raw: {...eventForm.raw, address: {...eventForm.raw.address, city: event.target.value} }})}/>
              </Form.Field>      
            </Form.Group>   
            {error != "" ? <div className="error">{error}</div> : ""}

            <Button type='submit' primary >{eventEdit ? "Modifier l'événement" : "Créer l'événement"}</Button>

            </Form>
    )
};

export default EventForm;
