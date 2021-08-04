import React, {useState, useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Dropdown, Grid, Segment, Label } from 'semantic-ui-react';

import AddTech from "../AddTech";

import axios from "axios";
import PhaseFormTechField from "../PhaseFormTechField";
import PhaseForm from "../PhaseForm"

import './styles.scss';

import base_base_url from "../../../config/dbConf";
const router = "admin";
const base_url = `${base_base_url}/${router}`;
const base_url_delete = base_base_url;

const ViewTech = function () {
  const [usersWithJob, setUsersWithJob] = useState([]);
  const [techSelected, setTechSelected] = useState(null);
  const [techDeleted, setTechDeleted] = useState(false);
  
  const getAllUsersWithJob = async () => {
    const response = await axios.get(`${base_url}/usersjob`, {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
    });
    console.log("response=", response);
    
    const filteredUserWithJob = response.data.filter(element => element.role === "tech");
    console.log("filteredUserWithJob", filteredUserWithJob);

    const newDropDownTechList = filteredUserWithJob.map(element => {
      return {
        text: element.firstname + " " + element.lastname,
        value: element.id,
        ...element
      };
    });
    console.log("newDropDownTechList", newDropDownTechList);

    setUsersWithJob(newDropDownTechList);

  };

  const onDeleteTech = async (techSelectedForDelete) => {
    console.log("onDeleteTech");

    try {
      const response = await axios.delete(`${base_url_delete}/users/${techSelectedForDelete.id}`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      });
      console.log("delete User Response", response);

      const response2 = await axios.delete(`${base_url_delete}/address/${techSelectedForDelete.address_id}`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      });
      console.log("delete Address Response", response2);

      //TODO faire le delete des jobs quand les routes seront dispo

      setUsersWithJob(usersWithJob.filter(element => element.id !== techSelectedForDelete.id));

      setTechDeleted(true);
      setTechSelected(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    console.log("ViewTech::use Effect");
    getAllUsersWithJob();
  },[]);
  console.log(usersWithJob);


  return(
    <div>
      <Form.Field>
      <Label>Technicien </Label>
      <Dropdown
        // multiple
        search
        //selection
        //defaultValue={defaultValue}
        options={usersWithJob}
        placeholder="Sélectionner un/des technicien(s)"
        onChange={(_, data) => {
          // TODO Lorsque je clique sur un tech, je veux afficher le profil du tech sur la meme page en gardant la liste déroulante
          // FAIT : modifier UserWithJob pour que ça ressemble à dropDownTechList -> .map
          // FAIT : Définir une valeur à techSelected
          // FAIT : rajouter dans le html le composant d'édition AddTech et le label de suppression
          // FAIT : importer AddTech
          // FAIT : rajouter un prop tech à AddTech pour afficher le tech sur lequel j'ai cliqué sur onChange
          // FAIT : rajouter un techSelected 
          // + EDIT
          // - peupler les variables de AddTech avec mon prop tech
          // - faire une édition plutôt qu'une création
          // - trouver les routes pour éditer un tech
          // appeler les bonnes routes avec les bonnes info !!!!!!
          // + DELETE
          // FAIT : rajouter un bouton "delete" dans le form
          // FAIT : trouver les routes pour delete un tech /users/:id(\\d+) + adress /address/:id(\\d+) + job
          // FAIT : on informe la CDP qu'on a delete la fiche et on cache le composant addTech
          // FAIT : faire le ménage dans la liste usersWithJob et dropDownTechList -> userWithJob.filter


          setTechSelected(data.options.find(element => element.value === data.value));          
          console.log("data", data);
          
          setTechDeleted(false);

          
        }}
      />
    </Form.Field>

      <div>
        {
        !techDeleted ? 
        <div style={ techSelected ? {} : {display: "none"} }>
          <AddTech tech={techSelected} onDelete={onDeleteTech} />
        </div> :
        <p className="deleted-tech">Le technicien a bien été effacé</p>
        }
      </div>
    </div>
  )
};

export default ViewTech;
