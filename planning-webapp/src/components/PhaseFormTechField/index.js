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
  typeFR,
  options,
  techsSelected,
  setTechsSelected,
}) {

  return (
    <Form.Field>
      <Label>Technicien {typeFR}</Label>
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
          let newTechsSelected = JSON.parse(JSON.stringify(techsSelected));
          newTechsSelected[type] = techsSelection;
          setTechsSelected(newTechsSelected);
        }}
      />
    </Form.Field>
  );
}

export default PhaseFormTechField;
