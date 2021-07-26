import React from 'react';
import { Button  } from 'semantic-ui-react';

import './styles.scss';

function EventForm () {

    return(
        <div className='CreateEvent'>
        <h1 className='title'>Créer un Event</h1>
                            
            <form className='submitEvent' method="POST" > 

                <input type='text' placeholder="Nom de l'évenement" /> 

                <label className='datePicker' for="start">Début</label> 
                    <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" /> 
                <label className='datePicker' for="start">Fin</label> 
                    <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" /> 

                <label for="appt">Heure de Début:</label>
                    <input type="time" id="appt" name="appt" />  
                <label for="appt">Heure de Fin:</label>
                    <input type="time" id="appt" name="appt" />  

                <input type='text' placeholder='Adresse' />               
                <input type="text" placeholder='Code postale' />
                <input type='text' placeholder='Ville' />               
                
                <div className='Submit-Tech' >
                    <Button type='submit' className='button' content="Créer l'event" primary />
                    
                </div>
            </form>
        </div>
    )
};

export default EventForm;