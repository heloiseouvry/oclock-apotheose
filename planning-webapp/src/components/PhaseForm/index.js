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
  Divider,
} from "semantic-ui-react";
import axios from "axios";
import PhaseFormTechField from "../PhaseFormTechField";

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
      value: user.id,
    });
    switch (user.type) {
      case "son":
        soundUsersFormatDropdown.push({
          key: user.id,
          text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
          value: user.id,
        });
        break;
      case "lumière":
        lightUsersFormatDropdown.push({
          key: user.id,
          text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
          value: user.id,
        });
        break;
      case "vidéo":
        videoUsersFormatDropdown.push({
          key: user.id,
          text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
          value: user.id,
        });
        break;
      case "autres":
        otherUsersFormatDropdown.push({
          key: user.id,
          text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
          value: user.id,
        });
        break;
      default:
        break;
    }
  }
})();

function PhaseForm({
  events,
  phaseInfo,
  phaseEdit,
  setPhaseEdit,
  closePhaseModal,
}) {
  console.log("phaseInfo", phaseInfo);
  let eventsFormatted = [];
  for (const event of events) {
    eventsFormatted.push({
      key: event.id,
      text: `#${event.id} ${event.name}`,
      value: event.id,
    });
  }

  const start_date = `${phaseInfo.start_date.getFullYear()}-${(
    "0" +
    (phaseInfo.start_date.getMonth() + 1)
  ).slice(-2)}-${("0" + phaseInfo.start_date.getDate()).slice(-2)}`;
  const start_time = `${("0" + phaseInfo.start_date.getHours()).slice(-2)}:${(
    "0" + phaseInfo.start_date.getMinutes()
  ).slice(-2)}`;

  const end_date = `${phaseInfo.end_date.getFullYear()}-${(
    "0" +
    (phaseInfo.end_date.getMonth() + 1)
  ).slice(-2)}-${("0" + phaseInfo.end_date.getDate()).slice(-2)}`;
  const end_time = `${("0" + phaseInfo.end_date.getHours()).slice(-2)}:${(
    "0" + phaseInfo.end_date.getMinutes()
  ).slice(-2)}`;

  const [soundTechsSelected, setSoundTechsSelected] = useState([]);
  const [lightTechsSelected, setLightTechsSelected] = useState([]);
  const [videoTechsSelected, setVideoTechsSelected] = useState([]);
  const [techs, setTechs] = useState(users);
  const [techsFormatDropdown, setTechsFormatDropdown] =
    useState(usersFormatDropdown);
  const [soundTechsFormatDropdown, setSoundTechsFormatDropdown] = useState(
    soundUsersFormatDropdown
  );
  const [lightTechsFormatDropdown, setLightTechsFormatDropdown] = useState(
    lightUsersFormatDropdown
  );
  const [videoTechsFormatDropdown, setVideoTechsFormatDropdown] = useState(
    videoUsersFormatDropdown
  );
  const [otherTechsFormatDropdown, setOtherTechsFormatDropdown] = useState(
    otherUsersFormatDropdown
  );
  const [eventsFormatDropdown, seteventsFormatDropdown] =
    useState(eventsFormatted);
  const [startDate, setStarDate] = useState();

  const [phaseForm, setPhaseForm] = useState({
    ...phaseInfo,
    start_date,
    end_date,
    start_time,
    end_time,
  });

  // console.log("techs", techs);

  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Dropdown
          required
          label="Lié à l'événement"
          search
          selection
          options={eventsFormatDropdown}
          placeholder="Liste des événements"
        ></Form.Dropdown>
        <Form.Dropdown
          required
          label="Type de phase"
          selection
          options={phaseTypes}
          defaultValue={1}
        ></Form.Dropdown>
        <FormField required>
          <label htmlFor="start_date">Date de début</label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            min="1900-01-01"
            max="2100-12-31"
            value={phaseForm.start_date}
            onChange={(event) =>
              setEventForm({ ...phaseForm, start_date: event.target.value })
            }
          />
        </FormField>
        <FormField required>
          <label htmlFor="start_hour">Heure de début</label>
          <input
            type="time"
            id="start_hour"
            name="start_date"
            value={phaseForm.start_time}
            onChange={(event) =>
              setEventForm({ ...phaseForm, start_time: event.target.value })
            }
          />
        </FormField>

        <FormField required>
          <label htmlFor="end_date">Date de fin</label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            min="1900-01-01"
            max="2100-12-31"
            value={phaseForm.end_date}
            onChange={(event) =>
              setEventForm({ ...phaseForm, end_date: event.target.value })
            }
          />
        </FormField>
        <FormField required>
          <label htmlFor="end_hour">Heure de fin</label>
          <input
            type="time"
            id="end_hour"
            name="end_hour"
            value={phaseForm.end_time}
            onChange={(event) =>
              setEventForm({ ...phaseForm, end_time: event.target.value })
            }
          />
        </FormField>
      </Form.Group>

      <Form.Group>
        <FormField required>
          <label htmlFor="title">Titre de la phase</label>
          <input
            id="title"
            placeholder="Titre de la phase"
            name="title"
            value={phaseForm.title}
            onChange={(event) =>
              setEventForm({ ...phaseForm, title: event.target.value })
            }
          />
        </FormField>
        <Form.Field>
          <label htmlFor="internal_location">Lieu interne</label>
          <input
            id="internal_location"
            type="text"
            placeholder="Lieu interne"
            name="internal_location"
            value={phaseForm.raw.address.main}
            onChange={(event) =>
              setEventForm({
                ...phaseForm,
                raw: {
                  ...phaseForm.raw,
                  address: {
                    ...phaseForm.raw.address,
                    main: event.target.value,
                  },
                },
              })
            }
          />
        </Form.Field>
      </Form.Group>

      <Form.Group>
        <FormField>
          <label htmlFor="tech_manager_contact">Contact régisseur</label>
          <input
            id="tech_manager_contact"
            placeholder="ex: Chuck Norris 0658759564"
            name="tech_manager_contact"
            value={phaseForm.tech_manager_contact}
            onChange={(event) =>
              setEventForm({
                ...phaseForm,
                tech_manager_contact: event.target.value,
              })
            }
          />
        </FormField>
        <FormField>
          <label htmlFor="provider_contact">Contact sur place</label>
          <input
            id="provider_contact"
            placeholder="ex: Barack Obama 0695741206"
            name="provider_contact"
            value={phaseForm.provider_contact}
            onChange={(event) =>
              setEventForm({
                ...phaseForm,
                provider_contact: event.target.value,
              })
            }
          />
        </FormField>
      </Form.Group>

      <Form.Group>
        <PhaseFormTechField
          type={"son"}
          options={soundTechsFormatDropdown}
          techsSelected={soundTechsSelected}
          setTechsSelected={setSoundTechsSelected}
        />
        <PhaseFormTechField
          type={"lumière"}
          options={lightTechsFormatDropdown}
          techsSelected={lightTechsSelected}
          setTechsSelected={setLightTechsSelected}
        />
        <PhaseFormTechField
          type={"vidéo"}
          options={videoTechsFormatDropdown}
          techsSelected={videoTechsSelected}
          setTechsSelected={setVideoTechsSelected}
        />
      </Form.Group>
      <Form.Group>
        {soundTechsSelected.map((tech, index) => (
          <Form.Input
            key={index}
            type="number"
            placeholder={`Salaire ${tech.split("(")[0]}`}
            min="0"
            step="10"
          />
        ))}
        {lightTechsSelected.map((tech, index) => (
          <Form.Input
            key={index}
            type="number"
            placeholder={`Salaire ${tech.split("(")[0]}`}
            min="0"
            step="10"
          />
        ))}
        {videoTechsSelected.map((tech, index) => (
          <Form.Input
            key={index}
            type="number"
            placeholder={`Salaire ${tech.split("(")[0]}`}
            min="0"
            step="10"
          />
        ))}
      </Form.Group>

      <Form.Field
        label="Commentaires"
        rows={2}
        control={TextArea}
        placeholder="Commentaires"
      />

      <Button type="submit" content="Créer la phase" primary />
    </Form>
  );
}

export default PhaseForm;
