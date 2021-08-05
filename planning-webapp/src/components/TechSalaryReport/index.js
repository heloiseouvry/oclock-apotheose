import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Grid } from "semantic-ui-react";
import axios from "axios";

import "./styles.scss";

import {router_url} from "../../../config/dbConf";

const TechSalaryReport = () => {
  const currentMonth = new Date().getMonth();
  const nextMonth = new Date().getMonth() + 1;
  const [startDate, setStartDate] = useState(`${new Date().getFullYear()}-${("0" + currentMonth).slice(-2)}-01`);
  const [endDate, setEndDate] = useState(`${new Date().getFullYear()}-${("0" + nextMonth).slice(-2)}-01`);
  const [salaryData, setSalaryData] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  let phase;

  const eventColorStyle = (backgroundColor) => {
    return {
      display: "inline-block",
      width: "15px",
      height: "15px",
      borderRadius: "15px",
      backgroundColor,
    };
  };

  let processSelectedDates = [];

  const processData = (data) => {
    const processedData = data.reduce((acc, val) => {
      if (!processSelectedDates.find((element) => element === val.start_date)) {
        processSelectedDates.push(val.start_date);
      }

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
          Math.floor((Date.parse(val.end_date) - Date.parse(val.start_date)) / 1000 / 3600),
        salary: val.salary,
      });
      return acc;
    }, {});

    processSelectedDates = processSelectedDates.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a == b) {
        return 0;
      } else {
        return 1;
      }
    });

    setSalaryData(Object.values(processedData));
    setSelectedDates(processSelectedDates);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${router_url}/useronesalary/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );
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

      {selectedDates.length ?
      <Grid textAlign="center" columns="equal" celled="internally">
        <Grid.Row>
          <Grid.Column width={1}>Technicien</Grid.Column>
          {selectedDates.map((date) => (
            <Grid.Column key={date}>
              <p>{`${new Date(date).toLocaleDateString()}`}</p>
              <p>
                {`${("0" + new Date(date).getHours()).slice(-2)}h${(
                  "0" + new Date(date).getMinutes()
                ).slice(-2)}`}
              </p>
            </Grid.Column>
          ))}
          {/* const date = (new Date(val.start_date)).toLocaleDateString(); */}
          <Grid.Column width={1}>Total</Grid.Column>
        </Grid.Row>

        {salaryData.map((tech) => (
          <Grid.Row key={tech.id}>
            <Grid.Column width={1}>
              {tech.firstname} {tech.lastname}
            </Grid.Column>

            {selectedDates.map((date) => (
              <Grid.Column key={date}>
                {tech.phases.find((elem) => {if(elem.start_date === date) {phase=elem; return elem;}}) ? (
                  <React.Fragment>
                    <div>
                      <div style={eventColorStyle(phase.color)}>&nbsp;</div>{" "}
                      {phase.event_title}
                    </div>
                    <div>{phase.title}</div>
                    <div>
                      {phase.duration}h - {phase.salary}€
                    </div>
                  </React.Fragment>
                ) : null}
              </Grid.Column>
            ))}

            <Grid.Column width={1}>
              <p>{tech.phases.length} jours travaillés</p>
              <p>{tech.total} €</p>
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
      : null }
    </div>
  );
};

export default TechSalaryReport;
