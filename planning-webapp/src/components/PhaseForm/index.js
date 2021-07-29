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
let soundUsersFormatDropdown = [];
let lightUsersFormatDropdown = [];
let videoUsersFormatDropdown = [];
let otherUsersFormatDropdown = [];
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
    });
    switch(user.type){
      case "son":
        soundUsersFormatDropdown.push({
          key: user.id,
          text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
          value: user.id
        });
        break;
      case "lumière":
        lightUsersFormatDropdown.push({
          key: user.id,
          text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
          value: user.id
        });
        break;
      case "vidéo":
        videoUsersFormatDropdown.push({
          key: user.id,
          text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
          value: user.id
        });
        break;
      case "autres":
        otherUsersFormatDropdown.push({
          key: user.id,
          text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
          value: user.id
        });
        break;
      default:
        break;
    }
  }
})();

function PhaseForm ({phaseInfo, phaseEdit, setPhaseEdit, closePhaseModal}) {
  console.log("phaseInfo", phaseInfo);

  const start_date = `${phaseInfo.start_date.getFullYear()}-${("0" + (phaseInfo.start_date.getMonth() + 1)).slice(-2)}-${("0" + phaseInfo.start_date.getDate()).slice(-2)}`;
  const start_time = `${("0" + phaseInfo.start_date.getHours()).slice(-2)}:${("0" + phaseInfo.start_date.getMinutes()).slice(-2)}`;

  const end_date = `${phaseInfo.end_date.getFullYear()}-${("0" + (phaseInfo.end_date.getMonth() + 1)).slice(-2)}-${("0" + phaseInfo.end_date.getDate()).slice(-2)}`;
  const end_time = `${("0" + phaseInfo.end_date.getHours()).slice(-2)}:${("0" + phaseInfo.end_date.getMinutes()).slice(-2)}`;

  const [soundTechsSelected, setSoundTechsSelected] = useState([]);
  const [lightTechsSelected, setLightTechsSelected] = useState([]);
  const [videoTechsSelected, setVideoTechsSelected] = useState([]);
  const [techs, setTechs] = useState(users);
  const [techsFormatDropdown, setTechsFormatDropdown] = useState(usersFormatDropdown);
  const [soundTechsFormatDropdown, setSoundTechsFormatDropdown] = useState(soundUsersFormatDropdown);
  const [lightTechsFormatDropdown, setLightTechsFormatDropdown] = useState(lightUsersFormatDropdown);
  const [videoTechsFormatDropdown, setVideoTechsFormatDropdown] = useState(videoUsersFormatDropdown);
  const [otherTechsFormatDropdown, setOtherTechsFormatDropdown] = useState(otherUsersFormatDropdown);
  const [startDate, setStarDate] = useState();

  const [phaseForm, setPhaseForm] = useState({ ...phaseInfo, start_date, end_date, start_time, end_time });

  // console.log("techs", techs);
  console.log("soundTechsSelected", soundTechsSelected);

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
              onChange={console.log("")}/>
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
        <Form.Group>
          <PhaseFormTechField type={"son"} options={soundTechsFormatDropdown} techsSelected={soundTechsSelected} setTechsSelected={setSoundTechsSelected} />
          <PhaseFormTechField type={"lumière"} options={lightTechsFormatDropdown} techsSelected={lightTechsSelected} setTechsSelected={setLightTechsSelected} />
          <PhaseFormTechField type={"vidéo"} options={videoTechsFormatDropdown} techsSelected={videoTechsSelected} setTechsSelected={setVideoTechsSelected} />
        </Form.Group>
        <Form.Group>
          {soundTechsSelected.map((tech, index) => <PhaseFormTechField key={index} type={"son"} options={soundTechsFormatDropdown} techsSelected={soundTechsSelected} setTechsSelected={setSoundTechsSelected} />)}
          {lightTechsSelected.map((tech, index) => <PhaseFormTechField key={index} type={"lumière"} options={lightTechsFormatDropdown} techsSelected={lightTechsSelected} setTechsSelected={setLightTechsSelected} />)}
          {videoTechsSelected.map((tech, index) => <PhaseFormTechField key={index} type={"vidéo"} options={videoTechsFormatDropdown} techsSelected={videoTechsSelected} setTechsSelected={setVideoTechsSelected} />)}
        </Form.Group>

        <Button
          type="submit"
          content="Créer la phase"
          primary
        />
        </Form>
    );
}

export default PhaseForm;
