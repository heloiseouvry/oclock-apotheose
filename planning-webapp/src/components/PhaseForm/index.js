import React from 'react';
import { Button, Dropdown, Form, FormField, Input, Checkbox, Label } from 'semantic-ui-react';

import './styles.scss';

const options = [
    { key: 1, text: 'Montage', value: 1 },
    { key: 2, text: 'Répétition', value: 2 },
    { key: 3, text: 'Exploitation', value: 3 },
    { key: 4, text: 'Démontage', value: 4 },
]
const techList = [
    { key: 1, text: 'Jacky', value: 1 },
    { key: 2, text: 'Michel', value: 2 },
    { key: 3, text: 'Henri', value: 3 },
    { key: 4, text: 'Max', value: 4 },
]

const PhaseForm = () =>{ 

    return(
        <div className='PhaseForm'>
            
            <Form  method="POST" >
            
            <h1 className='title'>Créer une Phase</h1> 
            
                <FormField required>
                {/* Si on veut relier Les phases, possibilités de mettre un controled Dropdown sur semanticUI */}
                <Dropdown selection options={options} placeholder='Liste des phases' />
                </FormField>

                <Form.Group className="Time">
                    <FormField required> 
                    <label  for="start">Début</label> 
                        <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" /> 
                    <label  for="start">Fin</label> 
                        <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" /> 

                    <label for="appt">Heure de Début:</label>
                        <input type="time" id="appt" name="appt" />  
                    <label for="appt">Heure de Fin:</label>
                        <input type="time" id="appt" name="appt" />
                        
                    <textarea className='comment' type='text' placeholder='Laissez un commentaire (2000 charactère maximum)' maxLength = "2000"/> 
                    </FormField>
                </Form.Group>

                <Form.Group >
                    <label >Selectioner un ou plusieurs métiers</label>
                    <Checkbox  label='Son' />
                    <Checkbox  label='Lumière' />
                    <Checkbox  label='Vidéo' />
                </Form.Group>

                <Form.Group className='techInput'>
                    <Label >Combien de techniciens pour le Son?   </Label>
                    <Input  placeholder="1" />
                    <Dropdown selection options={techList} placeholder='Liste des Tech' />
                    <Input  placeholder="Nombre d'heure" />
                    <Input  placeholder='Cachet' />
                    <Input  placeholder='Contact' />  {/* info recuperer dans la bdd */}
                </Form.Group>

                <Form.Group className='techInput'>
                    <Label >Combien de techniciens pour la lumière?</Label>
                    <Input  placeholder="1" />
                    <Dropdown selection options={techList} placeholder='Liste des Tech' />
                    <Input  placeholder="Nombre d'heure" />
                    <Input  placeholder='Cachet' />
                    <Input  placeholder='Contact' /> {/* info recuperer dans la bdd */}
                </Form.Group>

                <Form.Group className='techInput'>
                    <Label >Combien de techniciens pour la Vidéo?  </Label>
                    <Input  placeholder="1" />
                    <Dropdown selection options={techList} placeholder='Liste des Tech' />
                    <Input  placeholder="Nombre d'heure" />
                    <Input  placeholder='Cachet' />
                    <Input  placeholder='Contact' />  {/* info recuperer dans la bdd */}
                </Form.Group>
                
                
                
                <div className='Submit-Phase' >
                    <Button type='submit' className='button' content="Créer la phase" primary />
                    
                </div>
            </Form>
        </div>
    )
};

export default PhaseForm;