import React from "react";
import {
  Button,
  Dropdown,
  Form,
  FormField,
  Input,
  Checkbox,
  Label,
} from "semantic-ui-react";
import axios from "axios";

import "./styles.scss";

const host = "localhost";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

const options = [
  { key: 1, text: "Montage", value: 1 },
  { key: 2, text: "Répétition", value: 2 },
  { key: 3, text: "Exploitation", value: 3 },
  { key: 4, text: "Démontage", value: 4 },
];
class PhaseForm extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    sounds: [],
    lights: [],
    videos: [],
    soundTechs: [],
    lightTechs: [],
    videoTechs: [],
    start_date: "",
  };
  this.handleStartDateChange = this.handleStartDateChange.bind(this);
}

  componentDidMount() {
    axios
      .get(`${base_url}/available_users/son`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      })
      .then((addressResponse) => {
        for (const user of addressResponse.data) {
          this.setState({
            soundTechs: [
              ...this.state.soundTechs,
              {
                key: user.id,
                text: user.firstname,
                value: user.id,
              },
            ],
          });
        }
      });

    axios
      .get(`${base_url}/available_users/lumière`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      })
      .then((addressResponse) => {
        for (const user of addressResponse.data) {
          this.setState({
            lightTechs: [
              ...this.state.lightTechs,
              {
                key: user.id,
                text: user.firstname,
                value: user.id,
              },
            ],
          });
        }
      });

    axios
      .get(`${base_url}/available_users/vidéo`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      })
      .then((addressResponse) => {
        for (const user of addressResponse.data) {
          this.setState({
            videoTechs: [
              ...this.state.videoTechs,
              {
                key: user.id,
                text: user.firstname,
                value: user.id,
              },
            ],
          });
        }
      });
  }

  // componentDidUpdate(prevProps) {
  //   // Utilisation classique (pensez bien à comparer les props) :
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID);
  //   }
  // }

  addSoundTech() {
    this.setState({ sounds: [...this.state.sounds, ""] });
  }

  addLightTech() {
    this.setState({ lights: [...this.state.lights, ""] });
  }

  addVideoTech() {
    this.setState({ videos: [...this.state.videos, ""] });
  }

// Handle change functions for the technicians form
handleChangeSound(e, indexSound){

    this.state.sounds[indexSound] = e.target.value
    //Set the changeState
    this.stateState({sounds: this.state.sounds})
}
handleChangeLight(e, indexLight){

    this.state.lights[indexLight] = e.target.value
    //Set the changeState
    this.stateState({lights: this.state.lights})
}
handleChangeVideo(e, indexVideo){

    this.state.videos[indexVideo] = e.target.value
    //Set the changeState
    this.stateState({videos: this.state.videos})
}


// handle removal of the technicians form
  handleRemoveSound(indexSound) {
    this.state.sounds.splice(indexSound, 1);
    //Update the state
    this.setState({ sounds: this.state.sounds });
  }
  handleRemoveLight(indexLight) {
    this.state.lights.splice(indexLight, 1);
    //Update the state
    this.setState({ lights: this.state.lights });
  }
  handleRemoveVideo(indexVideo) {
    this.state.videos.splice(indexVideo, 1);
    //Update the state
    this.setState({ videos: this.state.videos });
  }

  handleStartDateChange(e) {
    this.setState({ start_date: e.target.value });
  }

  handleSubmit(e) {}

  render() {
    return (
      <div className="PhaseForm">
        <Form method="POST">
          <FormField required>
            {/* Si on veut relier Les phases, possibilités de mettre un controled Dropdown sur semanticUI */}
            <Dropdown
              selection
              options={options}
              placeholder="Liste des phases"
            />
          </FormField>

          <FormField required>
            <label htmlFor="start_date">Date de début</label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              contentEditable="true"
              min="1900-01-01"
              max="2100-12-31"
              onChange={this.handleStartDateChange}
            />
            <label htmlFor="end_date">Date de fin</label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              contentEditable="true"
              min="1900-01-01"
              max="2100-12-31"
            />

            <label htmlFor="start_hour">Heure de Début:</label>
            <input type="time" id="start_hour" name="start_date" />
            <label htmlFor="end_hour">Heure de Fin:</label>
            <input type="time" id="end_hour" name="end_hour" />

            <textarea
              className="comment"
              type="text"
              placeholder="Laissez un commentaire (2000 charactère maximum)"
              maxLength="2000"
            />
          </FormField>

          {/* <Form.Group >
                    <label >Selectioner un ou plusieurs métiers</label>
                    <Checkbox  label='Son' />
                    <Checkbox  label='Lumière' />
                    <Checkbox  label='Vidéo' />
                </Form.Group> */}

          <Form.Field className="techInput">
            <Label>Technicien Son </Label>
            <Dropdown
              selection
              options={this.state.soundTechs}
              placeholder="Liste des Tech"
            />
            <Input placeholder="Nombre d'heure" />
            <Input placeholder="Cachet" />
            <Input placeholder="Contact" /> {/* info recuperer dans la bdd */}
            <Button
              onClick={(e) => this.addSoundTech(e)}
              type="submit"
              className="button"
              content="Ajouter un technicien son"
              secondary
            />
          </Form.Field>
          {/* {
                        this.state.sounds.map((sound, indexSound)=>{
                            return(
                        <Form.Field key={indexSound} className='techInput'>
                        <Label >Technicien Son </Label>
                        <Dropdown selection options={this.state.soundTechs} placeholder='Liste des Tech' />
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Input  placeholder='Contact' />
                        <Button inverted color='red' onClick={() => this.handleRemoveSound(indexSound)} type='submit' className='button' content="Supprimer"  />
                        </Form.Field>)})
                    } */}
          <hr></hr>

          <Form.Field className="techInput">
            <Label>Technicien lumière</Label>
            <Dropdown
              selection
              options={this.state.lightTechs}
              placeholder="Liste des Tech"
            />
            <Input placeholder="Nombre d'heure" />
            <Input placeholder="Cachet" />
            <Input placeholder="Contact" /> {/* info recuperer dans la bdd */}
            <Button
              onClick={(e) => this.addLightTech(e)}
              type="submit"
              className="button"
              content="Ajouter un technicien lumière"
              secondary
            />
          </Form.Field>
          {/* {
                        this.state.lights.map((light, indexLight)=>{
                            return(
                        <Form.Field key={indexLight} className='techInput'>
                        <Label >Technicien Lumière </Label>
                        <Dropdown selection options={this.state.lightTechs} placeholder='Liste des Tech' />
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Input  placeholder='Contact' />
                        <Button inverted color='red' onClick={() => this.handleRemoveLight(indexLight)} type='submit' className='button' content="Supprimer" />
                        </Form.Field>)})
                    } */}
          <hr></hr>

          <Form.Field className="techInput">
            <Label>Techniciens vidéo </Label>
            <Dropdown
              selection
              options={this.state.videoTechs}
              placeholder="Liste des Tech"
            />
            <Input placeholder="Nombre d'heure" />
            <Input placeholder="Cachet" />
            <Input placeholder="Contact" /> {/* info recuperer dans la bdd */}
            <Button
              onClick={(e) => this.addVideoTech(e)}
              type="submit"
              className="button"
              content="Ajouter un technicien vidéo"
              secondary
            />
          </Form.Field>
          {/* {
                        this.state.videos.map((video, indexVideo)=>{
                            return(
                        <Form.Field key={indexVideo} className='techInput'>
                        <Label >Technicien vidéo </Label>
                        <Dropdown selection options={this.state.videoTechs} placeholder='Liste des Tech' />
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Input  placeholder='Contact' />
                        <Button inverted color='red' onClick={() => this.handleRemoveVideo(indexVideo)} type='submit' className='button' content="Supprimer"  />
                        </Form.Field>)})
                    } */}

          <div className="Submit-Phase">
            <Button
              onClick={(e) => this.handleSubmit(e)}
              type="submit"
              className="button"
              content="Créer la phase"
              primary
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default PhaseForm;
