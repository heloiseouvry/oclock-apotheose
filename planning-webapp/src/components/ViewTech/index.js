import React, { useState, useEffect } from "react";
import { Form, Dropdown, Label } from "semantic-ui-react";
import axios from "axios";

import AddTech from "../AddTech";

import "./styles.scss";

import { base_url, admin_url } from "../../../config/dbConf";

const ViewTech = function () {
  const [usersWithJob, setUsersWithJob] = useState([]);
  const [techSelected, setTechSelected] = useState(null);
  const [techDeleted, setTechDeleted] = useState(false);

  const getAllUsersWithJob = async () => {
    const response = await axios.get(`${admin_url}/usersjob`, {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
    });
    console.log("response=", response);

    const filteredUserWithJob = response.data.filter(
      (element) => element.role === "tech"
    );
    console.log("filteredUserWithJob", filteredUserWithJob);

    const newDropDownTechList = filteredUserWithJob.map((element) => {
      return {
        text: element.firstname + " " + element.lastname,
        value: element.id,
        ...element,
      };
    });
    console.log("newDropDownTechList", newDropDownTechList);

    setUsersWithJob(newDropDownTechList);
  };

  const onDeleteTech = async (techSelectedForDelete) => {
    console.log("onDeleteTech");

    try {
      const response = await axios.delete(
        `${base_url}/users/${techSelectedForDelete.id}`,
        {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("delete User Response", response);

      const response2 = await axios.delete(
        `${base_url}/address/${techSelectedForDelete.address_id}`,
        {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("delete Address Response", response2);

      //TODO faire le delete des jobs quand les routes seront dispo

      setUsersWithJob(
        usersWithJob.filter(
          (element) => element.id !== techSelectedForDelete.id
        )
      );

      setTechDeleted(true);
      setTechSelected(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("ViewTech::use Effect");
    getAllUsersWithJob();
  }, []);
  console.log(usersWithJob);

  return (
    <div>
      <Form.Field>
        <Label>Technicien</Label>
        <Dropdown
          search
          options={usersWithJob}
          placeholder="Sélectionner un technicien"
          onChange={(_, data) => {
            setTechSelected(
              data.options.find((element) => element.value === data.value)
            );
            console.log("data", data);
            setTechDeleted(false);
          }}
        />
      </Form.Field>

      <div>
        {!techDeleted ? (
          <div style={techSelected ? {} : { display: "none" }}>
            <AddTech tech={techSelected} onDelete={onDeleteTech} />
          </div>
        ) : (
          <p className="deleted-tech">Le technicien a bien été effacé</p>
        )}
      </div>
    </div>
  );
};

export default ViewTech;
