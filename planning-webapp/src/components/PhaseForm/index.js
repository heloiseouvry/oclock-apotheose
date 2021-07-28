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



class PhaseForm extends React.Component { 

state = { 
    sounds:[],
    lights:[],
    videos:[]
}
addSoundTech() {
    this.setState({sounds: [...this.state.sounds, ""]})
}

addLightTech() {
    this.setState({lights: [...this.state.lights, ""]})
}

addVideoTech() {
    this.setState({videos: [...this.state.videos, ""]})
}

handleChangeSound(e, indexSound){

    this.state.sounds[indexSound] = e.target.value
    //Set the changeState
    this.stateState({sounds: this.state.sounds})

}

handleChangeLight(e, indexlight){

}

handleChangevideo(e, indexVideo){

}

handleRemoveSound(indexSound){

    this.state.sounds.splice(indexSound, 1)
    //Update the state
    this.setState({sounds: this.state.sounds})
}
handleRemoveLight(indexLight){

    this.state.lights.splice(indexLight, 1)
    //Update the state
    this.setState({lights: this.state.lights})
}
handleRemoveVideo(indexVideo){

    this.state.videos.splice(indexVideo, 1)
    //Update the state
    this.setState({videos: this.state.videos})
}

handleSubmit(e){
    
}

render(){ 
    return(
        <div className='PhaseForm'>
            
            <Form  method="POST"  >
            
                <FormField required>
                {/* Si on veut relier Les phases, possibilités de mettre un controled Dropdown sur semanticUI */}
                <Dropdown selection options={options} placeholder='Liste des phases' />
                </FormField>

                
                    <FormField required> 
                    <label>Début</label> 
                        <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" /> 
                    <label>Fin</label> 
                        <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" /> 

                    <label>Heure de Début:</label>
                        <input type="time" id="appt" name="appt" />  
                    <label >Heure de Fin:</label>
                        <input type="time" id="appt" name="appt" />
                        
                    <textarea className='comment' type='text' placeholder='Laissez un commentaire (2000 charactère maximum)' maxLength = "2000"/> 
                    </FormField>
                

                {/* <Form.Group >
                    <label >Selectioner un ou plusieurs métiers</label>
                    <Checkbox  label='Son' />
                    <Checkbox  label='Lumière' />
                    <Checkbox  label='Vidéo' />
                </Form.Group> */}

                <Form.Field className='techInput'>
                
                    <Label >Technicien Son </Label>
                    <Dropdown selection options={techList} placeholder='Liste des Tech' />
                    <Input  placeholder="Nombre d'heure" />
                    <Input  placeholder='Cachet' />
                    <Input  placeholder='Contact' />  {/* info recuperer dans la bdd */}
                    <Button onClick={(e) => this.addSoundTech(e)} type='submit' className='button' content="Ajouter un technicien son" secondary />
                    
                </Form.Field>
                    {
                        this.state.sounds.map((sound, indexSound)=>{
                            return(
                        <Form.Field key={indexSound} className='techInput'>
                        <Label >Technicien Son </Label>
                        <Dropdown selection options={techList} placeholder='Liste des Tech' />
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Input  placeholder='Contact' />
                        <Button inverted color='red' onClick={() => this.handleRemoveSound(indexSound)} type='submit' className='button' content="Supprimer"  />
                        </Form.Field>)})
                    }
                    <hr></hr>

                <Form.Field className='techInput'>
                    <Label >Technicien lumière</Label>
                    <Dropdown selection options={techList} placeholder='Liste des Tech' />
                    <Input  placeholder="Nombre d'heure" />
                    <Input  placeholder='Cachet' />
                    <Input  placeholder='Contact' /> {/* info recuperer dans la bdd */}
                    <Button onClick={(e) => this.addLightTech(e)} type='submit' className='button' content="Ajouter un technicien lumière" secondary />
                </Form.Field>
                    {
                        this.state.lights.map((light, indexLight)=>{
                            return(
                        <Form.Field key={indexLight} className='techInput'>
                        <Label >Technicien Lumière </Label>
                        <Dropdown selection options={techList} placeholder='Liste des Tech' />
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Input  placeholder='Contact' />
                        <Button inverted color='red' onClick={() => this.handleRemoveLight(indexLight)} type='submit' className='button' content="Supprimer" />
                        </Form.Field>)})
                    }
                    <hr></hr>

                <Form.Field className='techInput'>
                    <Label >Techniciens vidéo </Label>
                    <Dropdown selection options={techList} placeholder='Liste des Tech' />
                    <Input  placeholder="Nombre d'heure" />
                    <Input  placeholder='Cachet' />
                    <Input  placeholder='Contact' />  {/* info recuperer dans la bdd */}
                    <Button onClick={(e) => this.addVideoTech(e)} type='submit' className='button' content="Ajouter un technicien vidéo" secondary />
                </Form.Field>
                {
                        this.state.videos.map((video, indexVideo)=>{
                            return(
                        <Form.Field key={indexVideo} className='techInput'>
                        <Label >Technicien vidéo </Label>
                        <Dropdown selection options={techList} placeholder='Liste des Tech' />
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Input  placeholder='Contact' />
                        <Button inverted color='red' onClick={() => this.handleRemoveVideo(indexVideo)} type='submit' className='button' content="Supprimer"  />
                        </Form.Field>)})
                    }
                
                <div className='Submit-Phase' >
                    <Button onClick={(e)=>this.handleSubmit(e)} type='submit' className='button' content="Créer la phase" primary />
                    
                </div>
            </Form>
        </div>
    )
}
};

export default PhaseForm;