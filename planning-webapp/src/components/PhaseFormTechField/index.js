import React from "react";
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

function PhaseFormTechField() {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field className="techInput">
        <Label>Technicien Son </Label>
        <Dropdown
          search
          selection
          options={techsFormatDropdown}
          placeholder="Liste des Tech"
        />
        <Form.Group>
          <Input type="number" placeholder="Salaire" />
          {/* <Input placeholder="Cachet" /> */}
          <Input placeholder="Contact" /> {/* info recuperer dans la bdd */}
        </Form.Group>
        <Button
          onClick={(e) => console.log(e)}
          type="submit"
          className="button"
          content="Ajouter un technicien son"
          secondary
        />
      </Form.Field>
    </Form>
  );
}

export default PhaseFormTechField;
