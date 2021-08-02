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

  const eventColorStyle = (backgroundColor) => {
    return {
      display: "inline-block",
      width: "15px",
      height: "15px",
      borderRadius: "15px",
      backgroundColor,
    };
  };

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
        event_title: val.event_title,
        color: val.color,
        type: val.type,
        start_date: val.start_date,
        end_date: val.end_date,
        duration:
          (Date.parse(val.end_date) - Date.parse(val.start_date)) / 1000 / 3600,
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
          <Button type="submit" primary>
            Filtrer
          </Button>
        </Form.Group>
      </Form>

      <Grid textAlign="center" columns="equal" celled="internally">
        <Grid.Row>
          <Grid.Column width={2}>Technicien</Grid.Column>
          <Grid.Column width={10}>Date</Grid.Column>
          <Grid.Column width={2}>Total</Grid.Column>
        </Grid.Row>

        {salaryData.map((tech) => (
          <Grid.Row key={tech.id}>
            <Grid.Column width={2}>
              {tech.firstname} {tech.lastname}
            </Grid.Column>

            {tech.phases.map((phase) => (
              <Grid.Column key={phase.title}>
                <div>
                  <div style={eventColorStyle(phase.color)}>&nbsp;</div>{" "}
                  {phase.event_title}
                </div>
                <div>{phase.title}</div>
                <div>
                  {phase.duration}h - {phase.salary}€
                </div>
              </Grid.Column>
            ))}
            <Grid.Column width={2}>
              <p>{tech.phases.length} jours travaillés</p>
              <p>{tech.total} €</p>
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    </div>
  );
};

export default SalaryReport;
