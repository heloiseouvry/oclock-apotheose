import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Modal,
  Radio,
  TextArea,
} from "semantic-ui-react";
import axios from "axios";

import "./styles.scss";

import { admin_url } from "../../../config/dbConf";

const requiredUserFields = [
  "lastname",
  "firstname",
  "phone_number",
  "email",
  "password",
  "birth_date",
  "birth_city",
  "birth_department",
  "ssn",
  "emergency_contact",
  "emergency_phone_number",
];
const requiredAddressFields = ["main", "zip_code", "city"];

function TechModal({ tech, setEditTech, closeTechModal }) {
  const [infoText, setInfoText] = useState("");
  const [addTechForm, setAddTech] = useState({
    lastname: "",
    firstname: "",
    phone_number: "",
    role: "tech",
    email: "",
    password: "",
    status: "intermittent",
    birth_date: "",
    birth_city: "",
    birth_department: "",
    ssn: "",
    intermittent_registration: "",
    legal_entity: "",
    siret: "",
    emergency_contact: "",
    emergency_phone_number: "",
    comments: "",
    address_id: null,
  });
  const [addJob, setAddJob] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [addAddress, setAddAddress] = useState({
    main: "",
    additional: "",
    zip_code: "",
    city: "",
  });

  useEffect(() => {
    if (tech) {
      setAddTech({
        lastname: tech.lastname,
        firstname: tech.firstname,
        phone_number: tech.phone_number,
        role: tech.role,
        email: tech.email,
        password: tech.password,
        status: tech.status,
        birth_date: tech.birth_date.substring(0, 10),
        birth_city: tech.birth_city,
        birth_department: tech.birth_department,
        ssn: tech.ssn,
        intermittent_registration: tech.intermittent_registration,
        legal_entity: tech.legal_entity,
        siret: tech.siret,
        emergency_contact: tech.emergency_contact,
        emergency_phone_number: tech.emergency_phone_number,
        comments: tech.comments,
        address_id: tech.address_id,
      });
      initAddJob(tech);
      initAddAddress(tech);
    }
  }, [tech]);

  const initAddJob = async (tech) => {
    let jobs = {
      1: false,
      2: false,
      3: false,
      4: false,
    };
    for (const job of tech.job) {
      switch (job) {
        case "sound":
          jobs = { ...jobs, 1: true };
          break;
        case "light":
          jobs = { ...jobs, 2: true };
          break;
        case "video":
          jobs = { ...jobs, 3: true };
          break;
        case "other":
          jobs = { ...jobs, 4: true };
          break;
      }
    }
    setAddJob(jobs);
  };

  const initAddAddress = async (tech) => {
    try {
      if (tech.address_id) {
        const addressResponse = await axios.get(
          `${admin_url}/address/${tech.address_id}`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAddAddress({
          main: addressResponse.data.main,
          additional: addressResponse.data.additional,
          zip_code: addressResponse.data.zip_code,
          city: addressResponse.data.city,
        });
      } else {
        setAddAddress({
          main: "",
          additional: "",
          zip_code: "",
          city: "",
        });
      }
    } catch (error) {
      console.error(error);
      setInfoText("Les informations sont incorrectes !");
    }
  };

  const checkFields = (obj, fields) => {
    for (const el of fields) {
      if (el === "password" && tech) {
        continue;
      }
      if (!obj[el]) return false;
    }
    return true;
  };

  const checkJobs = () => {
    for (const [key, value] of Object.entries(addJob)) {
      if (value) return true;
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkFields(addTechForm, requiredUserFields)) {
      console.log("addTechForm", addTechForm);
      setInfoText("Merci de renseigner les champs obligatoires du technicien");
      openInfoModal({ error: true });
      return;
    } else if (!checkFields(addAddress, requiredAddressFields)) {
      setInfoText(
        "Merci de renseigner les champs obligatoires de l'adresse du technicien"
      );
      openInfoModal({ error: true });
      return;
    } else if (!checkJobs()) {
      setInfoText("Merci de sélectionner au moins 1 métier");
      openInfoModal({ error: true });
      return;
    }

    try {
      if (!tech) {
        console.log("submit create");
        console.log("addAddress", addAddress);
        const addressResponse = await axios.post(
          `${admin_url}/address`,
          addAddress,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        addTechForm.address_id = addressResponse.data.id;
        console.log("addressResponse", addressResponse);
        console.log("addTechForm", addTechForm);

        const userResponse = await axios.post(
          `${admin_url}/users`,
          addTechForm,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const user_id = userResponse.data.id;
        console.log("userResponse", userResponse);

        console.log("addJob", addJob);
        let finalJobs = [];
        // If value === true (checkbox checked) it push the key in the array finalJobs
        for (const [key, value] of Object.entries(addJob)) {
          if (value === true) finalJobs.push(key);
        }
        console.log("finalJobs", finalJobs);

        const userHasJobResponse = await axios.post(
          `${admin_url}/userhasjob/${user_id}`,
          finalJobs,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("userHasJobResponse", userHasJobResponse);
        setInfoText("Le technicien a bien été enregistré");
        openInfoModal();
      } else {
        console.log("submit update");
        // Trying to update address and user blindly (no id from db)
        const addressResponse = await axios.patch(
          `${admin_url}/address/${addTechForm.address_id}`,
          addAddress,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // copy user into a new var and deleting password
        let userToEdit = tech;
        delete userToEdit.password;

        const userResponse = await axios.patch(
          `${admin_url}/users/${userToEdit.id}`,
          addTechForm,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const jobResponse = await axios.delete(
          `${admin_url}/userhasjob/${userToEdit.id}`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("jobResponse", jobResponse);

        let finalJobs = [];
        // If value === true (checkbox checked) it push the key in the array finalJobs
        for (const [key, value] of Object.entries(addJob)) {
          if (value === true) finalJobs.push(key);
        }
        console.log("finalJobs", finalJobs);

        const userHasJobResponse = await axios.post(
          `${admin_url}/userhasjob/${userToEdit.id}`,
          finalJobs,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("userHasJobResponse", userHasJobResponse);
        //TODO update jobs when route is existing
        setInfoText("Les modifications ont bien été prises en comptes");
        openInfoModal();
        setEditTech(null);
      }
      // closeTechModal();
    } catch (error) {
      console.error(error);
      setInfoText("Les informations sont incorrectes !");
      openInfoModal({ error: true });
    }
  };

  const [infoOpen, setInfoOpen] = useState(false);
  const [infoError, setInfoError] = useState(false);

  function openInfoModal(options = {}) {
    setInfoOpen(true);
    if (options?.error) {
      setInfoError(true);
    }
  }

  function closeInfoModal() {
    setInfoOpen(false);
    if (!infoError) {
      closeTechModal();
      location.reload();
    }
  }

  const [interChecked, setInterChecked] = useState(true);
  const [prestaChecked, setPrestaChecked] = useState(false);

  return (
    <div className="tech-modal">
      <Form onSubmit={handleSubmit} className="tech-modal-form">
        <section className="tech-modal-form-content">
          <section className="panel left">
            <section className="subpanel main-info">
              <div className="subpanel-title">Informations principales</div>
              <Form.Group>
                <Form.Field required>
                  <label htmlFor="lastname">Nom</label>
                  <input
                    id="lastname"
                    type="text"
                    value={addTechForm.lastname}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        lastname: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    id="firstname"
                    type="text"
                    value={addTechForm.firstname}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        firstname: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="phone_number">N° de téléphone</label>
                  <input
                    id="phone_number"
                    type="tel"
                    value={addTechForm.phone_number}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        phone_number: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={addTechForm.email}
                    onChange={(event) =>
                      setAddTech({ ...addTechForm, email: event.target.value })
                    }
                  />
                </Form.Field>
                {tech ? null : (
                  <Form.Field required>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                      id="password"
                      type="text"
                      value={addTechForm.password}
                      onChange={(event) =>
                        setAddTech({
                          ...addTechForm,
                          password: event.target.value,
                        })
                      }
                    />
                  </Form.Field>
                )}
              </Form.Group>
            </section>
            <section className="subpanel administrative-info">
              <div className="subpanel-title">Informations administratives</div>
              <Form.Group>
                <Form.Field required>
                  <label htmlFor="ssn">N° de sécurité sociale</label>
                  <input
                    id="ssn"
                    type="text"
                    value={addTechForm.ssn}
                    onChange={(event) =>
                      setAddTech({ ...addTechForm, ssn: event.target.value })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="birth_date">Date de naissance</label>
                  <input
                    id="birth_date"
                    type="date"
                    value={addTechForm.birth_date}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        birth_date: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="birth_city">Ville de naissance</label>
                  <input
                    id="birth_city"
                    type="text"
                    value={addTechForm.birth_city}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        birth_city: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="birth_department">
                    N° du département de naissance
                  </label>
                  <input
                    id="birth_department"
                    type="number"
                    value={addTechForm.birth_department}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        birth_department: event.target.value,
                      })
                    }
                  />
                </Form.Field>
              </Form.Group>
            </section>
            <section className="subpanel address">
              <div className="subpanel-title">Adresse</div>
              <Form.Group>
                <Form.Field required>
                  <label htmlFor="main">Adresse principale</label>
                  <input
                    id="main"
                    type="text"
                    value={addAddress.main}
                    onChange={(event) =>
                      setAddAddress({ ...addAddress, main: event.target.value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="additional">Complément d'adresse</label>
                  <input
                    id="additional"
                    type="text"
                    value={addAddress.additional}
                    onChange={(event) =>
                      setAddAddress({
                        ...addAddress,
                        additional: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="zip_code">Code postal</label>
                  <input
                    id="zip_code"
                    type="text"
                    value={addAddress.zip_code}
                    onChange={(event) =>
                      setAddAddress({
                        ...addAddress,
                        zip_code: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="city">Ville</label>
                  <input
                    id="city"
                    type="text"
                    value={addAddress.city}
                    onChange={(event) =>
                      setAddAddress({ ...addAddress, city: event.target.value })
                    }
                  />
                </Form.Field>
              </Form.Group>
            </section>
          </section>

          <section className="panel right">
            <section className="subpanel emergency-contact">
              <div className="subpanel-title">Contact d'urgence</div>
              <Form.Group>
                <Form.Field required>
                  <label htmlFor="emergency_contact">
                    Nom du contact d'urgence
                  </label>
                  <input
                    id="emergency_contact"
                    type="text"
                    value={addTechForm.emergency_contact}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        emergency_contact: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required>
                  <label htmlFor="emergency_phone_number">
                    N° de téléphone du contact d'urgence
                  </label>
                  <input
                    id="emergency_phone_number"
                    type="tel"
                    value={addTechForm.emergency_phone_number}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        emergency_phone_number: event.target.value,
                      })
                    }
                  />
                </Form.Field>
              </Form.Group>
            </section>
            <section className="subpanel status">
              <div className="subpanel-title">Statut</div>
              <Form.Group>
                <Form.Field>
                  <Radio
                    id="intermittent"
                    name="radioGroup"
                    label="Intermittent"
                    checked={interChecked}
                    onChange={(event) => {
                      setAddTech({ ...addTechForm, status: event.target.id });
                      setInterChecked(true);
                      setPrestaChecked(false);
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    id="prestataire"
                    name="radioGroup"
                    label="Prestataire"
                    checked={prestaChecked}
                    onChange={(event) => {
                      setAddTech({ ...addTechForm, status: event.target.id });
                      setInterChecked(false);
                      setPrestaChecked(true);
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </section>
            <section className="subpanel business-info">
              <div className="subpanel-title">Informations légales</div>
              <Form.Group>
                <Form.Field name="prestataire">
                  <label htmlFor="legal_entity">Raison sociale</label>
                  <input
                    id="legal_entity"
                    type="text"
                    disabled={interChecked}
                    value={addTechForm.legal_entity}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        legal_entity: event.target.value,
                      })
                    }
                  />
                </Form.Field>
                <Form.Field name="prestataire">
                  <label htmlFor="siret">N° SIRET</label>
                  <input
                    id="siret"
                    type="text"
                    value={addTechForm.siret}
                    disabled={interChecked}
                    onChange={(event) =>
                      setAddTech({ ...addTechForm, siret: event.target.value })
                    }
                  />
                </Form.Field>
                <Form.Field name="intermittent">
                  <label htmlFor="intermittent_registration">
                    N° de Congés Spectacles
                  </label>
                  <input
                    id="intermittent_registration"
                    type="text"
                    value={addTechForm.intermittent_registration}
                    disabled={prestaChecked}
                    onChange={(event) =>
                      setAddTech({
                        ...addTechForm,
                        intermittent_registration: event.target.value,
                      })
                    }
                  />
                </Form.Field>
              </Form.Group>
            </section>
            <section className="subpanel jobs">
              <div className="subpanel-title">Métier</div>
                <section className="panel-container">
                  <section className="panel">
                    <Checkbox
                      label="Son"
                      key="1"
                      value="1"
                      checked={addJob[1]}
                      onChange={(_, data) =>
                        setAddJob({ ...addJob, [data.value]: data.checked })
                      }
                    />
                    <Checkbox
                      label="Lumière"
                      key="2"
                      value="2"
                      checked={addJob[2]}
                      onChange={(_, data) =>
                        setAddJob({ ...addJob, [data.value]: data.checked })
                      }
                    />
                  </section>
                  <section className="panel">
                    <Checkbox
                      label="Vidéo"
                      key="3"
                      value="3"
                      checked={addJob[3]}
                      onChange={(_, data) =>
                        setAddJob({ ...addJob, [data.value]: data.checked })
                      }
                    />
                    <Checkbox
                      label="Autre"
                      key="4"
                      value="4"
                      checked={addJob[4]}
                      onChange={(_, data) =>
                        setAddJob({ ...addJob, [data.value]: data.checked })
                      }
                    />
                  </section>
                </section>
            </section>
          </section>
        </section>

        <section className="comments">
          <Form.Group>
            <Form.Field>
              <label>Commentaires / Remarques</label>
            </Form.Field>
            <TextArea
              placeholder="Inscrivez vos commentaires"
              id="comments"
              value={addTechForm.comments}
              onChange={(event) =>
                setAddTech({ ...addTechForm, comments: event.target.value })
              }
            />
          </Form.Group>
        </section>
        <Button icon="check" type="submit" content="Valider" primary />
      </Form>

      <Modal
        centered
        closeIcon
        onClose={closeInfoModal}
        onOpen={openInfoModal}
        open={infoOpen}
        size="small"
      >
        <Modal.Content>
          <Icon
            name={infoError ? "times circle" : "check circle"}
            color={infoError ? "red" : "green"}
            size="big"
          />
          {infoText}
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default TechModal;
