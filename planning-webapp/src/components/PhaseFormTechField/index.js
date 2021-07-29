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
          multiple
          search
          selection
          options={options}
          placeholder="Sélectionner un/des technicien(s)"
          onChange={(event) => { console.log(event.target);
            console.log(event);
            setTechsSelected([...techsSelected, event.target.innerText])
          }}
        />
      </Form.Field>
  );
}

export default PhaseFormTechField;
