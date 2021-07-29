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

function PhaseFormTechField({
  type,
  options,
  techsSelected,
  setTechsSelected,
}) {
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
        onChange={(_, data) => {
          let techsSelection = [];
          for (const value of data.value) {
            const techFound = data.options.find((tech) => tech.value === value);
            techsSelection.push({
              id: techFound.value,
              name: techFound.text,
            });
          }
          setTechsSelected(techsSelection);
        }}
      />
    </Form.Field>
  );
}

export default PhaseFormTechField;
