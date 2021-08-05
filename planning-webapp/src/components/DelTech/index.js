import React, {useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Dropdown } from 'semantic-ui-react';

import axios from "axios";
import PhaseFormTechField from "../PhaseFormTechField";

import './styles.scss';

const DelTech = function () {
  
  return(
    <div>
      <h1>Technicien à supprimer</h1>
      <div>
        {PhaseFormTechField()}
      </div>
    </div>
  )
};

export default DelTech
