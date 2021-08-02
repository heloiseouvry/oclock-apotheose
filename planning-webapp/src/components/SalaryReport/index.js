import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Grid } from "semantic-ui-react";
import axios from "axios";

import "./styles.scss";

const host = "localhost";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

const SalaryReport = () => {
  const [startDate, setStartDate] = useState("2021-07-01");
  const [endDate, setEndDate] = useState("2021-08-31");
  const [salaryData, setSalaryData] = useState([]);

  const processSalaries = (data) => {
    let salaryData = [];
    data.forEach(function (item) {
      if (salaryData.hasOwnProperty(item.id)) {
        salaryData[item.id].salary += item.salary;
      } else {
        salaryData[item.id] = { ...item };
      }
    });

    console.log(Object.values(salaryData));
    setSalaryData(Object.values(salaryData));
    console.log("salarydata", salaryData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("dates choisies");

    const requestBody = {
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await axios.get(
        `${base_url}/userssalary/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(response.data);

      processSalaries(response.data);
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

        <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}></Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
      </Grid>
      )
      <ul>
        {salaryData.map((tech) => (
          <li key={`tech-${tech.id}`}>
            {tech.firstname} {tech.lastname} - {tech.type} - {tech.salary} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalaryReport;
