import React, { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormField,
  Input,
  Checkbox,
  Label,
  TextArea, 
  Divider
} from "semantic-ui-react";
import axios from "axios";
import PhaseFormTechField from "../PhaseFormTechField"

import "./styles.scss";

const host = "localhost";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

const phaseTypes = [
  { key: 1, text: "Montage", value: 1 },
  { key: 2, text: "Répétition", value: 2 },
  { key: 3, text: "Exploitation", value: 3 },
  { key: 4, text: "Démontage", value: 4 },
];

// getAllUsersWithJob();
let users;
let usersFormatDropdown = [];
(async () => {
  const response = await axios.get(`${base_url}/usersjob`, {
    headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
  });
  users = response.data;
  for (const user of users) {
    usersFormatDropdown.push({
      key: user.id,
      text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
      value: user.id
    })
  }
})();

function PhaseForm ({phaseInfo, phaseEdit, setPhaseEdit, closePhaseModal}) {
  console.log("phaseInfo", phaseInfo);

  const start_date = `${phaseInfo.start_date.getFullYear()}-${("0" + (phaseInfo.start_date.getMonth() + 1)).slice(-2)}-${("0" + phaseInfo.start_date.getDate()).slice(-2)}`;
  const start_time = `${("0" + phaseInfo.start_date.getHours()).slice(-2)}:${("0" + phaseInfo.start_date.getMinutes()).slice(-2)}`;

  const end_date = `${phaseInfo.end_date.getFullYear()}-${("0" + (phaseInfo.end_date.getMonth() + 1)).slice(-2)}-${("0" + phaseInfo.end_date.getDate()).slice(-2)}`;
  const end_time = `${("0" + phaseInfo.end_date.getHours()).slice(-2)}:${("0" + phaseInfo.end_date.getMinutes()).slice(-2)}`;

  const [sound, setSound] = useState();
  const [light, setLight] = useState();
  const [video, setVideo] = useState();
  const [techs, setTechs] = useState(users);
  const [techsFormatDropdown, setTechsFormatDropdown] = useState(usersFormatDropdown);
  const [soundTech, setSoundTech] = useState([]);
  const [lightTech, setLightTech] = useState([]);
  const [videoTech, setVideoTech] = useState([]);
  const [startDate, setStarDate] = useState();

  const [phaseForm, setPhaseForm] = useState({ ...phaseInfo, start_date, end_date, start_time, end_time });

  console.log("techs", techs);

useEffect(() => { 


 }, []);

const handleSubmit = async (event) => {
  event.preventDefault();
};

    return (
        <Form onSubmit={handleSubmit}>
          {/* <FormField required> */}
            {/* Si on veut relier Les phases, possibilités de mettre un controled Dropdown sur semanticUI */}
            <Dropdown
              selection
              options={phaseTypes}
              placeholder="Type de phases"
            />
          {/* </FormField> */}
        <Form.Group>
          <FormField required>
            <label htmlFor="start_date">Date de début</label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              min="1900-01-01"
              max="2100-12-31"
              onChange={console.log("change")}/>
          </FormField>
          <FormField required>
            <label htmlFor="start_hour">Heure de début</label>
            <input type="time" id="start_hour" name="start_date" />
          </FormField>

          <FormField required>
            <label htmlFor="end_date">Date de fin</label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              min="1900-01-01"
              max="2100-12-31"
            />
          </FormField>
          <FormField required>
            <label htmlFor="end_hour">Heure de fin</label>
            <input type="time" id="end_hour" name="end_hour" />
            </FormField>
        </Form.Group>

        <TextArea rows={2} placeholder="Commentaire" />

        <Divider />

          <Form.Field className="techInput">
            <Label>Technicien Son </Label>
            <Dropdown
              search
              selection
              options={techsFormatDropdown}
              placeholder="Liste des Tech"
            />
            <Form.Group>
              <Input type="number" placeholder="Salaire" />
              {/* <Input placeholder="Cachet" /> */}
              <Input placeholder="Contact" /> {/* info recuperer dans la bdd */}
            </Form.Group>
            <Button
              onClick={(e) => console.log(e)}
              type="submit"
              className="button"
              content="Ajouter un technicien son"
              secondary
            />
          </Form.Field>
          {/* {
                        sounds.map((sound, indexSound)=>{
                            return(
                        <Form.Field key={indexSound} className='techInput'>
                        <Label >Technicien Son </Label>
                        <Dropdown selection options={soundTechs} placeholder='Liste des Tech' />
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
              search
              selection
              options={techsFormatDropdown}
              placeholder="Liste des Tech"
            />
            <Input placeholder="Nombre d'heure" />
            <Input placeholder="Cachet" />
            <Input placeholder="Contact" /> {/* info recuperer dans la bdd */}
            <Button
              onClick={(e) => console.log(e)}
              type="submit"
              className="button"
              content="Ajouter un technicien lumière"
              secondary
            />
          </Form.Field>
          {/* {
                        lights.map((light, indexLight)=>{
                            return(
                        <Form.Field key={indexLight} className='techInput'>
                        <Label >Technicien Lumière </Label>
                        <Dropdown selection options={lightTechs} placeholder='Liste des Tech' />
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
              search
              selection
              options={techsFormatDropdown}
              placeholder="Liste des Tech"
            />
            <Input placeholder="Nombre d'heure" />
            <Input placeholder="Cachet" />
            <Input placeholder="Contact" /> {/* info recuperer dans la bdd */}
            <Button
              onClick={(e) => console.log(e)}
              type="submit"
              className="button"
              content="Ajouter un technicien vidéo"
              secondary
            />
          </Form.Field>
          {/* {
                        videos.map((video, indexVideo)=>{
                            return(
                        <Form.Field key={indexVideo} className='techInput'>
                        <Label >Technicien vidéo </Label>
                        <Dropdown selection options={videoTechs} placeholder='Liste des Tech' />
                        <Input  placeholder="Nombre d'heure" />
                        <Input  placeholder='Cachet' />
                        <Input  placeholder='Contact' />
                        <Button inverted color='red' onClick={() => this.handleRemoveVideo(indexVideo)} type='submit' className='button' content="Supprimer"  />
                        </Form.Field>)})
                    } */}

          <div className="Submit-Phase">
            <Button
              type="submit"
              className="button"
              content="Créer la phase"
              primary
            />
          </div>
        </Form>
    );
}

export default PhaseForm;
