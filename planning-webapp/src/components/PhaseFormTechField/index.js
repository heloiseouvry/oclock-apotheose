import React, { useState } from "react";
import { Dropdown, Form, Label } from "semantic-ui-react";

import "./styles.scss";

function PhaseFormTechField({
  type,
  typeFR,
  defaultValue,
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
        defaultValue={defaultValue}
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
          // console.log("newTechsSelected", newTechsSelected);
          setTechsSelected(newTechsSelected);
        }}
      />
    </Form.Field>
  );
}

export default PhaseFormTechField;
