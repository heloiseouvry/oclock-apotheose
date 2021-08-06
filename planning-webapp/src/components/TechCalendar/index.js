// import React from 'react';
import React, { useCallback, useRef, useState, useEffect } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import { Button } from "semantic-ui-react";
import axios from "axios";

// import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";

import "./styles.scss";

import {router_url} from "../../../config/dbConf";

const darkTheme = {
  "common.border": "1px solid #B5B5B5",
  "common.backgroundColor": "#27292A",
  "common.saturday.color": "#fff",
  "common.holiday.color": "#fff",
  "common.dayname.color": "#fff",
  "common.today.color": "#B5B5B5",
  // creation guide style
  "common.creationGuide.backgroundColor": "#B5B5B5",
  "common.creationGuide.border": "1px solid #B5B5B5",
  // week header 'dayname'
  "week.dayname.height": "42px",
  "week.dayname.borderTop": "1px solid #e5e5e5",
  "week.dayname.borderBottom": "1px solid #e5e5e5",
  "week.dayname.borderLeft": "inherit",
  "week.dayname.textAlign": "center",
  "week.today.color": "#B5B5B5",
  // week vertical panel 'vpanel'
  "week.vpanelSplitter.border": "1px solid #fff",
  "week.vpanelSplitter.height": "3px",
  // week timegrid 'timegrid'
  "week.timegridLeft.width": "72px",
  "week.timegridLeft.backgroundColor": "#121212",
  "week.timegridLeft.borderRight": "1px solid #e5e5e5",
  "week.timegridLeft.fontSize": "12px",
  "week.timegridOneHour.height": "52px",
  "week.timegridHalfHour.height": "26px",
  "week.timegridHalfHour.borderBottom": "1px dashed rgba(229,229,229,0.3)",
  "week.timegridHorizontalLine.borderBottom": "1px solid #e5e5e5",

  "week.timegrid.paddingRight": "8px",
  "week.timegrid.borderRight": "1px solid #e5e5e5",
  "week.timegridSchedule.borderRadius": "5px",
  "week.timegridSchedule.paddingLeft": "2px",

  "week.currentTime.color": "#B5B5B5",
  "week.currentTime.fontSize": "16px",
  "week.currentTime.fontWeight": "bold",

  "week.pastTime.color": "#B5B5B5",
  "week.pastTime.fontWeight": "normal",

  "week.futureTime.color": "#B5B5B5",
  "week.futureTime.fontWeight": "normal",

  "week.currentTimeLinePast.border": "1px dashed #B5B5B5",
  "week.currentTimeLineBullet.backgroundColor": "#B5B5B5",
  "week.currentTimeLineToday.border": "1px solid #B5B5B5",
  "week.currentTimeLineFuture.border": "1px dashed #B5B5B5",

  // week creation guide style
  "week.creationGuide.color": "#B5B5B5",
  "week.creationGuide.fontSize": "14px",
  "week.creationGuide.fontWeight": "bold",

  // week daygrid schedule style
  "week.dayGridSchedule.borderRadius": "5px",
  "week.dayGridSchedule.height": "24px",
  "week.dayGridSchedule.marginTop": "2px",
  "week.dayGridSchedule.marginLeft": "8px",
  "week.dayGridSchedule.marginRight": "8px",
};

const TechCalendar = () => {
  const [events, setEvents] = useState([]);
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        // get all events from the API
        const response = await axios.get(`${router_url}/events`, {
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
        const response = await axios.get(`${router_url}/users/planning`, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        let phasesToAdd = [];
        for (const phaseBack of response.data) {
          const techInfoResponse = await axios.get(
            `${router_url}/phases/${phaseBack.id}/techsinfo`,
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
    timegridDisplayPrimayTime: function(time) {
      /* will be deprecated. use 'timegridDisplayPrimaryTime' */
      var hour = time.hour;
      var meridiem = hour >= 24 ? 'H 00' : 'H 00';

      if (hour > 24) {
        hour = hour - 24;
      }

      return hour + ' ' + meridiem;
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
    <div className="tech-calendar">
      <section className="calendar-nav-views">
        <Button size="mini" content="<" secondary onClick={prevView} />
        <Button size="mini" content="Jour" secondary onClick={dayView} />
        <Button size="mini" content="Semaine" secondary onClick={weekView} />
        <Button size="mini" content="Mois" secondary onClick={monthView} />
        <Button size="mini" content=">" secondary onClick={nextView} />
        <Button
          size="mini"
          content="Aujourd'hui"
          secondary
          onClick={todayView}
        />
      </section>

      <section className="tech-tui-calendar">
        <TUICalendar
          ref={cal}
          height="600px"
          view="week"
          week={{
            startDayOfWeek: 1,
            daynames: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
          }}
          theme={darkTheme}
          isReadOnly={true}
          taskView={false}
          useCreationPopup={false} // "false" to use our form instead of app Popup
          useDetailPopup={true}
          template={templates}
          calendars={events}
          schedules={phases}
          onClickSchedule={onClickSchedule}
        />
      </section>
    </div>
  );
};

export default TechCalendar;
