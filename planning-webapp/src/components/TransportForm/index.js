import React from 'react';
import { Button, Dropdown, Form, FormField, Input, Checkbox, Label } from 'semantic-ui-react';

import './styles.scss';

const options = [
    { key: 1, text: 'Enlèvement', value: 1 },
    { key: 2, text: 'Livraison', value: 2 },
    { key: 3, text: 'Reprise', value: 3 },
]
const techList = [
    { key: 1, text: 'Jacky', value: 1 },
    { key: 2, text: 'Michel', value: 2 },
    { key: 3, text: 'Henri', value: 3 },
    { key: 4, text: 'Max', value: 4 },
]



class TransportForm extends React.Component { 

state = { 
    vehicles:[],
    deliveryMans:[],
    techs:[]
}
addVehicle() {
    this.setState({vehicles: [...this.state.vehicles, ""]})
}
addDeliveryMan() {
    this.setState({deliveryMans: [...this.state.deliveryMans, ""]})
}
addTech() {
    this.setState({techs: [...this.state.techs, ""]})
}


render(){ 
    return(
        <div className='PhaseForm'>
            
            <Form  method="POST"  >
            
            <h1 className='title'>Créer un Transport</h1> 
            
                <FormField required>
                {/* Si on veut relier Les phases, possibilités de mettre un controled Dropdown sur semanticUI */}
                <Dropdown selection options={options} placeholder='Liste des transports' />
                </FormField>

                
                    <FormField required> 
                    <label>Début</label> 
                        <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" />
                        <label>Heure de Début:</label>
                        <input type="time" id="appt" name="appt" />

                        <label >Adresse de départ </label> 
                        <input type="text" placeholder="Nom de L'adresse de départ" />
                        <input type="text" placeholder='Addresse' />
                        <input type="text" placeholder='Code postale' />
                        <input type='text' placeholder='Ville' />            
                        <input type="text" placeholder='Téléphone contact sur place' />
                    </FormField>

                    <FormField>
                    <textarea className='comment' type='text' placeholder='Laissez un commentaire (2000 charactère maximum)' maxLength = "2000"/>
                    </FormField>

                    <FormField required> 
                    <label>Fin</label> 
                    <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" />
                    <label >Heure de Fin:</label>
                    <input type="time" id="appt" name="appt" />

                    <label >Adresse d'arrivée </label> 
                    <input type="text" placeholder="Nom de L'adresse d'arrivée" />
                    <input type="text" placeholder="Addresse" />
                    <input type="text" placeholder='Code postale' />
                    <input type='text' placeholder='Ville' />               
                    <input type="text" placeholder='Téléphone contact sur place' />         
                    </FormField>

                    <FormField>
                    <textarea className='comment' type='text' placeholder='Laissez un commentaire (2000 charactère maximum)' maxLength = "2000"/>
                    </FormField>

                    <Form.Group className='techInput' >
                        <Label >Livreur </Label>
                        <Input  placeholder="Nom" />
                        <Input  placeholder='Contact' />
                        <Input  placeholder='Entreprise' /> 
                        <Label >Véhicule </Label>
                        <Input  placeholder="Immatriculation" />
                        <Input  placeholder='Marque' />
                        <Input  placeholder='Modèle' />
                        <Input  placeholder='Volume' />
                        <Button onClick={(e) => this.addVehicle(e)} type='submit' className='button' content="Ajouter un chauffeur/véhicule" secondary />
                    </Form.Group>
                    {
                        this.state.vehicles.map((vehicle, indexVehicle)=>{
                            return(
                            <Form.Group className='techInput' >
                            <Label >Livreur </Label>
                            <Input  placeholder="Nom" />
                            <Input  placeholder='Contact' />
                            <Input  placeholder='Entreprise' /> 
                            <Label >Véhicule </Label>
                            <Input  placeholder="Immatriculation" />
                            <Input  placeholder='Marque' />
                            <Input  placeholder='Modèle' />
                            <Input  placeholder='Volume' />
                            
                            </Form.Group>)})
                    }
                    <hr></hr>

                    <Form.Group className='techInput'>
                        <Label >Technicien </Label>
                        <Dropdown selection options={techList} placeholder='Liste des Tech' />
                        <Input  placeholder='Contact' />  {/* info recuperer dans la bdd */}
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Label >Véhicule </Label>
                        <Input  placeholder="Immatriculation" />
                        <Input  placeholder='Marque' />
                        <Input  placeholder='Modèle' />
                        <Input  placeholder='Volume' />
                        <Button onClick={(e) => this.addTech(e)} type='submit' className='button' content="Ajouter un technicien avec vehicule " secondary />
                    </Form.Group>
                    {
                        this.state.techs.map((tech, indexTech)=>{
                            return(
                        <Form.Group key={indexTech} className='techInput'>
                        <Label >Technicien </Label>
                        <Dropdown selection options={techList} placeholder='Liste des Tech' />
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Input  placeholder='Contact' />
                        <Label >Véhicule </Label>
                        <Input  placeholder="Immatriculation" />
                        <Input  placeholder='Marque' />
                        <Input  placeholder='Modèle' />
                        <Input  placeholder='Volume' />
                        </Form.Group>)})
                    }

                
                <div className='Submit-Phase' >
                    <Button onClick={(e)=>this.handleSubmit(e)} type='submit' className='button' content="Créer la phase" primary />
                    
                </div>
            </Form>
        </div>
    )
}
};

export default TransportForm;