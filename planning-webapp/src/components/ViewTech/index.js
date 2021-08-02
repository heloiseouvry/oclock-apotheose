import React, {useState, useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Dropdown, Grid, Segment, Label } from 'semantic-ui-react';

import axios from "axios";
import PhaseFormTechField from "../PhaseFormTechField";
import PhaseForm from "../PhaseForm"

import './styles.scss';

const host = "100.25.136.194";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;



const ViewTech = function () {
  const [usersWithJob, setUsersWithJob] = useState([]);

  const getAllUsersWithJob = async () => {
    const response = await axios.get(`${base_url}/usersjob`, {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
    });
    setUsersWithJob([key=response.data.name, ...response.data]);
  };

  useEffect(()=>{
    getAllUsersWithJob()
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
          let techsSelection = [];
          for (const value of data.value) {
            const techFound = data.options.find((tech) => tech.value === value);
            techsSelection.push({
              id: techFound.value,
              name: techFound.text,
            });
          }
          let newTechsSelected = JSON.parse(JSON.stringify(techsSelected));
          newTechsSelected[type] = techsSelection;
          // console.log("newTechsSelected", newTechsSelected);
          setTechsSelected(newTechsSelected);
        }}
      />
    </Form.Field>
    </div>
  )
};

export default ViewTech
