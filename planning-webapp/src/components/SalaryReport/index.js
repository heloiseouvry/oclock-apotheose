import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Grid } from "semantic-ui-react";
import axios from "axios";

import "./styles.scss";

const host = "100.25.136.194";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

const SalaryReport = () => {
  const [startDate, setStartDate] = useState("2021-07-01");
  const [endDate, setEndDate] = useState("2021-08-31");
  const [salaryData, setSalaryData] = useState([]);

  const processData = (data) => {
    console.log("data", data);
    const processedData = data.reduce((acc, val) => {
      acc[val.id] = acc[val.id] || {};
      acc[val.id].id = val.id;
      acc[val.id].lastname = val.lastname;
      acc[val.id].firstname = val.firstname;
      if (acc[val.id].hasOwnProperty("total")) {
        acc[val.id].total += val.salary;
      } else {
        acc[val.id].total = val.salary;
      }
      acc[val.id].phases = acc[val.id].phases || [];
      acc[val.id].phases.push({
        title: val.title,
        type: val.type,
        start_date: val.start_date,
        end_date: val.end_date,
        salary: val.salary,
      });
      return acc;
    }, {});
    console.log("reduce to array", Object.values(processedData));
    setSalaryData(Object.values(processedData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${base_url}/userssalary/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );
      // console.log("response.data", response.data);
      processData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Salary Report</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Field inline required>
            <label htmlFor="start_date">Date de début</label>
            <input
              id="start_date"
              type="date"
              name="start_date"
              min="1900-01-01"
              max="2100-12-31"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Form.Field>
          <Form.Field inline required>
            <label htmlFor="end_date">Date de fin</label>
            <input
              id="end_date"
              type="date"
              name="end_date"
              min="1900-01-01"
              max="2100-12-31"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Button type="submit" primary>
          Filtrer
        </Button>
      </Form>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={3}>Technicien</Grid.Column>
          <Grid.Column width={10}>Phases</Grid.Column>
          <Grid.Column width={3}>Total</Grid.Column>
        </Grid.Row>

        {salaryData.map((tech) => (
          <Grid.Row key={tech.id}>
            <Grid.Column width={3}>
              {tech.firstname} {tech.lastname}
            </Grid.Column>
            <Grid.Column width={10}>
              <ul>
                {tech.phases.map((phase) => (
                  <li key={phase.title}>
                    {phase.title} - {phase.salary}€
                  </li>
                ))}
              </ul>
            </Grid.Column>
            <Grid.Column width={3}>
              <p>{tech.phases.length} jours travaillés</p>
              <p>{tech.total} €</p>
            </Grid.Column>
          </Grid.Row>
        ))}
        <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}></Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default SalaryReport;
