// import React from 'react';
import React, { useCallback, useRef, useState, useEffect } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import { Button } from "semantic-ui-react";
import axios from "axios";

// import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";

import "./styles.scss";

const host = "100.25.136.194";
const port = "4000";
const router = "v1";
const base_url = `http://${host}:${port}/${router}`;

const TechCalendar = () => {
  const [events, setEvents] = useState([]);
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        // get all events from the API
        const response = await axios.get(`${base_url}/events`, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        let eventsToAdd = [];
        // loop through the array of events we get in response.data
        for (const eventBack of response.data) {
          // for each event we get from the API we create an object eventFront that has the right structure for the library
          let eventFront = {
            id: eventBack.id.toString(),
            name: eventBack.title,
            color: "#ffffff",
            bgColor: eventBack.color,
            dragBgColor: "#00a9ff",
            borderColor: "#001247",
          };
          eventsToAdd.push(eventFront);
        }
        // we update the props events with this array of all the eventFront
        setEvents(eventsToAdd);
      } catch (error) {
        console.error(error);
      }
    };

    const getAllPhases = async () => {
      try {
        const response = await axios.get(`${base_url}/users/planning`, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        let phasesToAdd = [];
        for (const phaseBack of response.data) {
          const techInfoResponse = await axios.get(
            `${base_url}/phases/${phaseBack.id}/techsinfo`,
            {
              headers: {
                Authorization: `bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          let attendees = [];
          if (techInfoResponse.data) {
            for (const tech of techInfoResponse.data) {
              attendees.push(
                `${tech.firstname} ${tech.lastname[0]}. (${tech.phone_number})`
              );
            }
          }

          const start_date = new Date(phaseBack.start_date);
          const end_date = new Date(phaseBack.end_date);
          let category,
            location,
            isAllDay = null;
          if (phaseBack.type === "event") {
            category = "allday";
            isAllDay = true;
          } else {
            category = "time";
            isAllDay = false;
            location = phaseBack.internal_location;
          }
          let phaseFront = {
            id: phaseBack.id.toString(),
            calendarId: phaseBack.event_id.toString(),
            attendees,
            category: category,
            isVisible: true,
            isAllDay,
            location,
            title: phaseBack.title,
            body: phaseBack.comments,
            start: start_date,
            end: end_date,
            raw: {
              type: phaseBack.type,
              address: {
                main: phaseBack.main,
                additional: phaseBack.additional,
                zip_code: phaseBack.zip_code,
                city: phaseBack.city,
              },
              tech_manager_contact: phaseBack.tech_manager_contact,
              provider_contact: phaseBack.provider_contact,
              techInfo: techInfoResponse.data,
            },
            color: "#ffffff",
            bgColor: phaseBack.color,
          };

          phasesToAdd.push(phaseFront);
        }
        setPhases(phasesToAdd);
      } catch (error) {
        console.error(error);
      }
    };
    getAllEvents();
    getAllPhases();
  }, []);

  const cal = useRef(null);

  function dayView() {
    cal.current.calendarInst.changeView("day", true);
  }

  function weekView() {
    cal.current.calendarInst.changeView("week", true);
  }

  function monthView() {
    cal.current.calendarInst.changeView("month", true);
  }

  function todayView() {
    cal.current.calendarInst.today();
  }

  function prevView() {
    cal.current.calendarInst.prev();
  }

  function nextView() {
    cal.current.calendarInst.next();
  }

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);
  }, []);

  function getFormattedTime(time) {
    const date = new Date(time);
    const h = ("0" + date.getHours()).slice(-2);
    const m = ("0" + date.getMinutes()).slice(-2);

    return `${h}:${m}`;
  }

  function getTimeTemplate(schedule, isAllDay) {
    var html = [];

    if (!isAllDay) {
      html.push("<strong>" + getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span className="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span className="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span className="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span className="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span className="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  // Le template sert à rendre la vue de la phase, j'y place toutes les infos que je reçois du form via la fonction popupDetailBody(phaseDetails)
  const templates = {
    time: function (schedule) {
      return getTimeTemplate(schedule, false);
    },
    popupDetailBody: (phaseDetails) => {
      console.log(`popupDetailBody`, phaseDetails);
      var ret = "<div>" + phaseDetails.body;
      ret += "<p><strong>" + phaseDetails.raw?.type + "</strong></p>";
      ret += "<ul>";
      ret += "</ul>";
      ret += "</div>";
      return ret;
    },
  };

  return (
    <div className="App TechCalendar">
      <Button size="mini" content="<" secondary onClick={prevView} />
      <Button size="mini" content="Jour" secondary onClick={dayView} />
      <Button size="mini" content="Semaine" secondary onClick={weekView} />
      <Button size="mini" content="Mois" secondary onClick={monthView} />
      <Button size="mini" content=">" secondary onClick={nextView} />
      <Button size="mini" content="Aujourd'hui" secondary onClick={todayView} />

      <TUICalendar
        ref={cal}
        height="600px"
        view="week"
        week={{
          startDayOfWeek: 1,
          daynames: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
        }}
        isReadOnly={true}
        taskView={false}
        useCreationPopup={false} // "false" to use our form instead of app Popup
        useDetailPopup={true}
        template={templates}
        calendars={events}
        schedules={phases}
        onClickSchedule={onClickSchedule}
      />
    </div>
  );
};

export default TechCalendar;
