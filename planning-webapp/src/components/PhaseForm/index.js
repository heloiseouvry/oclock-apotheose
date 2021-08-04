import React, { useState, useEffect } from "react";
import { Button, Form, FormField, TextArea } from "semantic-ui-react";
import axios from "axios";
import PhaseFormTechField from "../PhaseFormTechField";

import "./styles.scss";

import base_base_url from "../../../config/dbConf";
const router = "admin";
const base_url = `${base_base_url}/${router}`;

const phaseTypes = [
  { key: 1, text: "Montage", value: "montage" },
  { key: 2, text: "Répétition", value: "repetition" },
  { key: 3, text: "Exploitation", value: "exploitation" },
  { key: 4, text: "Démontage", value: "demontage" },
];

function PhaseForm({
  users,
  events,
  phaseInfo,
  phaseEdit,
  setPhaseEdit,
  closePhaseModal,
}) {
  let usersFormatDropdown = {
    sound: [],
    light: [],
    video: [],
    other: [],
  };
  for (const user of users) {
    usersFormatDropdown[user.type].push({
      key: user.id,
      text: `${user.firstname} ${user.lastname[0]}. (${user.phone_number})`,
      value: user.id,
    });
  }

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

  let techsAssigned = {
    sound: [],
    light: [],
    video: [],
    other: [],
  };
  let salaryAssigned = {};
  if (phaseInfo.raw.techInfo) {
    for (const info of phaseInfo.raw.techInfo) {
      console.log("info", info);
      techsAssigned[info.type].push({
        id: info.id,
        name: `${info.firstname} ${info.lastname[0]}. (${info.phone_number})`,
      });
      salaryAssigned[info.id] = info.salary;
    }
  }

  const [error, setError] = useState("");
  const [techsSelected, setTechsSelected] = useState({
    sound: phaseEdit ? techsAssigned.sound : [],
    light: phaseEdit ? techsAssigned.light : [],
    video: phaseEdit ? techsAssigned.video : [],
    other: phaseEdit ? techsAssigned.other : [],
  });
  const [soundTechsFormatDropdown, setSoundTechsFormatDropdown] = useState(
    usersFormatDropdown.sound
  );
  const [lightTechsFormatDropdown, setLightTechsFormatDropdown] = useState(
    usersFormatDropdown.light
  );
  const [videoTechsFormatDropdown, setVideoTechsFormatDropdown] = useState(
    usersFormatDropdown.video
  );
  const [otherTechsFormatDropdown, setOtherTechsFormatDropdown] = useState(
    usersFormatDropdown.other
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
  const [salaryForm, setSalaryForm] = useState(phaseEdit ? salaryAssigned : {});

  console.log("phaseForm", phaseForm);
  // console.log("techs", techs);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("phaseForm", phaseForm);
    console.log("salaryForm", salaryForm);
    console.log("techsSelected", techsSelected);

    try {
      const startParsedDate = new Date(
        Date.parse(`${phaseForm.start_date}T${phaseForm.start_time}:00`)
      );
      const endParsedDate = new Date(
        Date.parse(`${phaseForm.end_date}T${phaseForm.end_time}:00`)
      );

      const phaseBody = { ...phaseForm };
      phaseBody.start_date = startParsedDate;
      phaseBody.end_date = endParsedDate;
      phaseBody.type = phaseForm.raw.type;
      phaseBody.tech_manager_contact = phaseForm.raw.tech_manager_contact;
      phaseBody.provider_contact = phaseForm.raw.provider_contact;
      phaseBody.internal_location = phaseForm.location;
      phaseBody.number_fee = 0;
      phaseBody.comments = phaseForm.body;
      phaseBody.event_id = phaseForm.calendarId;

      if (phaseEdit) {
        const phaseResponse = await axios.patch(
          `${base_url}/phases/${phaseBody.id}`,
          phaseBody,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await axios.delete(`${base_url}/phases/${phaseBody.id}/unassign`, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        for (const type in techsSelected) {
          const techsByType = techsSelected[type];
          for (const tech of techsByType) {
            let salaryBody = { tech_id: tech.id, salary: salaryForm[tech.id] };
            await axios.post(
              `${base_url}/phases/${phaseResponse.data.id}/assign`,
              salaryBody,
              {
                headers: {
                  Authorization: `bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          }
        }
        setPhaseEdit(false);
      } else {
        const phaseResponse = await axios.post(
          `${base_url}/phases`,
          phaseBody,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        for (const type in techsSelected) {
          const techsByType = techsSelected[type];
          for (const tech of techsByType) {
            let salaryBody = { tech_id: tech.id, salary: salaryForm[tech.id] };
            await axios.post(
              `${base_url}/phases/${phaseResponse.data.id}/assign`,
              salaryBody,
              {
                headers: {
                  Authorization: `bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          }
        }
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
          onChange={(_, data) => {     
            setPhaseForm({
              ...phaseForm,
              title: `${data.options.filter(d => d.value === data.value)[0].text} - `,
              raw: { ...phaseForm.raw, type: data.value },
            });
          }}
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
            value={phaseForm.raw.tech_manager_contact}
            onChange={(event) =>
              setPhaseForm({
                ...phaseForm,
                raw: {
                  ...phaseForm.raw,
                  tech_manager_contact: event.target.value,
                },
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
            value={phaseForm.raw.provider_contact}
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
          key="1"
          type={"sound"}
          typeFR={"son"}
          defaultValue={techsSelected.sound.map((tech) => tech.id)}
          options={soundTechsFormatDropdown}
          techsSelected={techsSelected}
          setTechsSelected={setTechsSelected}
        />
        <PhaseFormTechField
          key="2"
          type={"light"}
          typeFR={"lumière"}
          defaultValue={techsSelected.light.map((tech) => tech.id)}
          options={lightTechsFormatDropdown}
          techsSelected={techsSelected}
          setTechsSelected={setTechsSelected}
        />
        <PhaseFormTechField
          key="3"
          type={"video"}
          typeFR={"vidéo"}
          defaultValue={techsSelected.video.map((tech) => tech.id)}
          options={videoTechsFormatDropdown}
          techsSelected={techsSelected}
          setTechsSelected={setTechsSelected}
        />
      </Form.Group>
      <Form.Group>
        {techsSelected.sound?.map((tech, index) => (
          <Form.Input
            icon="euro"
            label={`Salaire ${tech.name.split("(")[0]}`}
            key={index}
            type="number"
            min="0"
            value={salaryForm[tech.id] ? salaryForm[tech.id] : 0}
            onChange={(event) =>
              setSalaryForm({ ...salaryForm, [tech.id]: event.target.value })
            }
          />
        ))}
        {techsSelected.light?.map((tech, index) => (
          <Form.Input
            icon="euro"
            label={`Salaire ${tech.name.split("(")[0]}`}
            key={index}
            type="number"
            min="0"
            value={salaryForm[tech.id] ? salaryForm[tech.id] : 0}
            onChange={(event) =>
              setSalaryForm({ ...salaryForm, [tech.id]: event.target.value })
            }
          />
        ))}
        {techsSelected.video?.map((tech, index) => (
          <Form.Input
            icon="euro"
            label={`Salaire ${tech.name.split("(")[0]}`}
            key={index}
            type="number"
            min="0"
            value={salaryForm[tech.id] ? salaryForm[tech.id] : 0}
            onChange={(event) =>
              setSalaryForm({ ...salaryForm, [tech.id]: event.target.value })
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

      <Button type="submit" primary>
        {phaseEdit ? "Modifier la phase" : "Créer la phase"}
      </Button>
    </Form>
  );
}

export default PhaseForm;
