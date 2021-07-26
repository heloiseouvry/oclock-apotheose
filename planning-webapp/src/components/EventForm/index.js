import React from 'react';
import { Button, Form  } from 'semantic-ui-react';
// import SemanticDatepicker from 'semantic-ui-calendar';

import './styles.scss';

function EventForm ({setEventForm}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    setEventForm(event.data)
  };

    return(
        <Form onSubmit={handleSubmit}>                            
            {/* <form className='submitEvent' method="POST" >  */}
            <Form.Field>
              <label>Nom de l'évenement</label>
              <input placeholder="Nom de l'évenement" />
            </Form.Field>

            <Form.Field>
              <label className='datePicker' htmlFor="start">Début</label> 
              <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" /> 
            </Form.Field>
               <Form.Field>
                <label className='datePicker' htmlFor="start">Fin</label> 
                <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" /> 
               </Form.Field>

               <Form.Field>
                 <label htmlFor="appt">Heure de Début:</label>
                  <input type="time" id="appt" name="appt" />  
               </Form.Field>
               <Form.Field>
                 <label htmlFor="appt">Heure de Fin:</label>
                <input type="time" id="appt" name="appt" />  
                </Form.Field>   

                <Form.Field><input type='text' placeholder='Adresse' />   </Form.Field>            
                <Form.Field><input type="text" placeholder='Code postale' /></Form.Field>
                <Form.Field><input type='text' placeholder='Ville' />         </Form.Field>      
                
                <div className='Submit-Tech' >
                    <Button type='submit' className='button' content="Créer l'event" primary />
                    
                </div>
            {/* </form> */}
            </Form>
    )
};

export default EventForm;
