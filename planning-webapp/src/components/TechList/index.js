import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Modal, Grid, Table, Header } from "semantic-ui-react";
import axios from "axios";

import TechModal from "../TechModal";
import "./styles.scss";

import { admin_url } from "../../../config/dbConf";

const TechList = () => {
  const [techs, setTechs] = useState([]);
  const [techOpen, setTechOpen] = useState(false);
  const [editTech, setEditTech] = useState(null);
  const [deleteTechModal, setDeleteTechModal] = useState(false);
  const [techToDelete, setTechToDelete] = useState(false);
  const [techSelected, setTechSelected] = useState(null);

  const getAllUsersWithJob = async () => {
    const response = await axios.get(`${admin_url}/usersjob`, {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
    });
    const filteredUserWithJob = response.data.filter(
      (element) => element.role === "tech"
    );
    console.log("filteredUserWithJob", filteredUserWithJob);
    setTechs(filteredUserWithJob);
  };

  const deleteTech = async (techSelectedForDelete) => {
    console.log("onDeleteTech");
    console.log("techSelectedForDelete", techSelectedForDelete);

    try {
      const response = await axios.delete(
        `${admin_url}/users/${techSelectedForDelete.id}`,
        {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("delete User Response", response);

      const response2 = await axios.delete(
        `${admin_url}/address/${techSelectedForDelete.address_id}`,
        {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("delete Address Response", response2);

      //TODO faire le delete des jobs quand les routes seront dispo

      getAllUsersWithJob();

      setTechSelected(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsersWithJob();
  }, []);

  function openTechModal() {
    setTechOpen(true);
  }

  function closeTechModal() {
    setTechOpen(false);
    setEditTech(null);
  }

  function openDeleteTechModal() {
    setDeleteTechModal(true);
  }

  function closeDeleteTechModal() {
    setDeleteTechModal(false);
  }

  return (
    <div>
      <h1>Liste des techniciens</h1>
      <section className="tech-list-container">
        {techs.length ? (
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Technicien</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {techs.map((tech) => (
                <Table.Row key={tech.id}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {tech.firstname} {tech.lastname}
                        <Header.Subheader>{tech.job}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button
                        inverted
                        icon="edit"
                        onClick={() => {
                          setEditTech(tech);
                          openTechModal();
                        }}
                      />
                      <Button
                        inverted
                        icon="delete"
                        onClick={() => {
                          setTechToDelete(tech);
                          openDeleteTechModal();
                        }}
                      />
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : null}
      </section>
      <Button
        icon="add"
        size="massive"
        floated="right"
        circular
        onClick={openTechModal}
      />

      <Modal
        closeIcon
        onClose={closeTechModal}
        onOpen={openTechModal}
        open={techOpen}
        size="large"
      >
        <Modal.Header>
          {editTech ? "Modifier un technicien" : "Ajouter un technicien"}
        </Modal.Header>
        <Modal.Actions>
          <TechModal
            tech={editTech ? editTech : null}
            setEditTech={setEditTech}
            closeTechModal={closeTechModal}
          />
        </Modal.Actions>
      </Modal>

      <Modal
        closeIcon
        onClose={closeDeleteTechModal}
        onOpen={openDeleteTechModal}
        open={deleteTechModal}
        size="mini"
      >
        <Modal.Header>Supprimer un technicien</Modal.Header>
        <Modal.Content>
          <p>Êtes-vous sûr(e) de vouloir supprimer ce technicien ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeDeleteTechModal}>
            Annuler
          </Button>
          <Button
            positive
            onClick={() => {
              deleteTech(techToDelete);
              closeDeleteTechModal();
            }}
          >
            Oui
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default TechList;
