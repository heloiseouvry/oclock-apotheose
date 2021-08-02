import React, {useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Dropdown, Grid, Segment } from 'semantic-ui-react';

import axios from "axios";
import PhaseFormTechField from "../PhaseFormTechField";
import PhaseForm from "../PhaseForm"

import './styles.scss';

const host = "100.25.136.194";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;



const ViewTech = function () {
  
  return(
    <div>
      <PhaseFormTechField
      option={PhaseForm.usersFormatDropdown}
      >

      </PhaseFormTechField>
    </div>
  )
};

export default ViewTech
