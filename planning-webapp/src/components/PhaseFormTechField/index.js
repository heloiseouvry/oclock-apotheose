import React, { useState } from "react";
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

import "./styles.scss";

function PhaseFormTechField({type, options, techsSelected, setTechsSelected}) {

  const [tech, setTech] = useState("");

  return (
      <Form.Field>
        <Label>Technicien {type}</Label>
        <Dropdown
          search
          selection
          options={options}
          placeholder="Sélectionner un technicien"
          onChange={(event) => setTech(event.target.innerText)}
        />
        <Input type="number" placeholder="Salaire" min="0" step="10"/>
        <Button
          onClick={(e) => setTechsSelected([...techsSelected, tech])}
          content={`Ajouter un technicien ${type}`}
          secondary
        />
      </Form.Field>
  );
}

export default PhaseFormTechField;
