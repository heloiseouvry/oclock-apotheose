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
  { key: 1, text: "Montage", value: "montage" },
  { key: 2, text: "Répétition", value: "repetition" },
  { key: 3, text: "Exploitation", value: "exploitation" },
  { key: 4, text: "Démontage", value: "demontage" },
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
  // console.log("phaseInfo", phaseInfo);
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

  const [error, setError] = useState("");
  const [soundTechsSelected, setSoundTechsSelected] = useState([]);
  const [lightTechsSelected, setLightTechsSelected] = useState([]);
  const [videoTechsSelected, setVideoTechsSelected] = useState([]);
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

  const [phaseForm, setPhaseForm] = useState({
    ...phaseInfo,
    start_date,
    end_date,
    start_time,
    end_time,
  });
  const [salaryForm, setSalaryForm] = useState({});

  // console.log("phaseForm", phaseForm);
  // console.log("techs", techs);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("phaseForm", phaseForm);
    console.log("salaryForm", salaryForm);

    try {
      const startParsedDate = new Date(Date.parse(`${phaseForm.start_date}T${phaseForm.start_time}:00`));
      const endParsedDate = new Date(Date.parse(`${phaseForm.end_date}T${phaseForm.end_time}:00`));
      
      const phaseBody = {...phaseForm};
      phaseBody.start_date = startParsedDate;
      phaseBody.end_date = endParsedDate;
      phaseBody.type = phaseForm.raw.type;
      phaseBody.tech_manager_contact = phaseForm.raw.tech_manager_contact;
      phaseBody.provider_contact = phaseForm.raw.provider_contact;
      phaseBody.internal_location = phaseForm.location;
      phaseBody.number_fee = 0;
      phaseBody.comments = phaseForm.body;
      phaseBody.event_id = phaseForm.calendarId;

      console.log("phaseBody", phaseBody);
      if(phaseEdit){
        // const phaseBody = {...phaseBody, 
        //   event_id: eventResponse.data.event_id,
        //   type: 'event',
        //   number_fee: '0',
        //   user_id: eventResponse.data.user_id
        // };
        // await axios.patch(`${base_url}/phases/${eventResponse.data.id}`, phaseBody, {
        //   headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        // });
        setPhaseEdit(false);
      } else {
        const response = await axios.post(`${base_url}/phases`, phaseBody, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        console.log("response", response);
      }
      closePhaseModal();
    } catch (error) {
      console.error(error);
      setError("Les informations sont incorrectes !");
    }
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
          value={phaseForm.calendarId}
          onChange={(_, data) =>
            setPhaseForm({ ...phaseForm, calendarId: data.value })
          }
        ></Form.Dropdown>
        <Form.Dropdown
          required
          label="Type de phase"
          selection
          options={phaseTypes}
          // defaultValue={1}
          value={phaseForm.raw.type}
          onChange={(_,data) =>
            setPhaseForm({
              ...phaseForm,
              raw: { ...phaseForm.raw, type: data.value },
            })
          }
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
              setPhaseForm({ ...phaseForm, start_date: event.target.value })
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
              setPhaseForm({ ...phaseForm, start_time: event.target.value })
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
              setPhaseForm({ ...phaseForm, end_date: event.target.value })
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
              setPhaseForm({ ...phaseForm, end_time: event.target.value })
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
              setPhaseForm({ ...phaseForm, title: event.target.value })
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
            value={phaseForm.location}
            onChange={(event) =>
              setPhaseForm({ ...phaseForm, location: event.target.value })
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
              setPhaseForm({
                ...phaseForm,
                raw: { ...phaseForm.raw, tech_manager_contact: event.target.value },
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
              setPhaseForm({
                ...phaseForm,
                raw: { ...phaseForm.raw, provider_contact: event.target.value },
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
            placeholder={`Salaire ${tech.name.split("(")[0]}`}
            min="0"
            step="10"
            value={salaryForm[tech.id] ? salaryForm[tech.id] : 0}
            onChange={(event) =>
              setSalaryForm({...salaryForm, [tech.id]: event.target.value})
            }
          />
        ))}
        {lightTechsSelected.map((tech, index) => (
          <Form.Input
            key={index}
            type="number"
            placeholder={`Salaire ${tech.name.split("(")[0]}`}
            min="0"
            step="10"
            value={salaryForm[tech.id] ? salaryForm[tech.id] : 0}
            onChange={(event) =>
              setSalaryForm({...salaryForm, [tech.id]: event.target.value})
            }
          />
        ))}
        {videoTechsSelected.map((tech, index) => (
          <Form.Input
            key={index}
            type="number"
            placeholder={`Salaire ${tech.name.split("(")[0]}`}
            min="0"
            step="10"
            value={100}
            onChange={(event) =>
              setSalaryForm({...salaryForm, [tech.id]: event.target.value})
            }
          />
        ))}
      </Form.Group>

      <Form.Field
        name="comments"
        label="Commentaires"
        rows={2}
        control={TextArea}
        placeholder="Commentaires"
        value={phaseForm.body}
        onChange={(event) =>
          setPhaseForm({ ...phaseForm, body: event.target.value })
        }
      />

      <Button type="submit" content="Créer la phase" primary />
    </Form>
  );
}

export default PhaseForm;
