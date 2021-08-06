// import React from 'react';
import React, { useCallback, useRef, useState, useEffect } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";

import EventForm from "../EventForm";
import PhaseForm from "../PhaseForm";

// import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";

import "./styles.scss";

import { admin_url } from "../../../config/dbConf";

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

const MyCalendar = () => {
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [phaseOpen, setPhaseOpen] = useState(false);

  const [eventEdit, setEventEdit] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    title: "",
    start_date: new Date(),
    end_date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    color: "#ffffff",
    bgColor: "#000000",
    raw: {
      type: "",
      address: {
        id: null,
        main: "",
        additional: "",
        zip_code: "",
        city: "",
      },
    },
  });

  const [phaseEdit, setPhaseEdit] = useState(false);
  const [phaseInfo, setPhaseInfo] = useState({
    id: null,
    calendarId: null,
    title: "",
    body: "",
    location: "",
    attendees: [],
    start_date: new Date(),
    end_date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    color: "#ffffff",
    bgColor: "#000000",
    raw: {
      type: "",
      address: {
        id: null,
        main: "",
        additional: "",
        zip_code: "",
        city: "",
      },
      tech_manager_contact: "",
      provider_contact: "",
    },
  });

  const [events, setEvents] = useState([]);
  const [phases, setPhases] = useState([]);
  const [usersWithJob, setUsersWithJob] = useState([]);

  const getAllEvents = async () => {
    try {
      // get all events from the API
      const response = await axios.get(`${admin_url}/events`, {
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
      const response = await axios.get(`${admin_url}/phases`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      });
      let phasesToAdd = [];
      for (const phaseBack of response.data) {
        const techInfoResponse = await axios.get(
          `${admin_url}/phases/${phaseBack.id}/techsinfo`,
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
              id: phaseBack.address_id,
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

  const getAllUsersWithJob = async () => {
    const response = await axios.get(`${admin_url}/usersjob`, {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
    });
    setUsersWithJob(response.data);
  };

  useEffect(() => {
    getAllEvents();
    getAllPhases();
    getAllUsersWithJob();
  }, []);

  const cal = useRef(null);

  function openChoiceModal() {
    setChoiceOpen(true);
  }

  function openEventModal() {
    closeChoiceModal();
    setEventOpen(true);
  }

  function openPhaseModal() {
    closeChoiceModal();
    setPhaseOpen(true);
  }

  function closeChoiceModal() {
    setChoiceOpen(false);
  }

  function closeEventModal() {
    getAllEvents();
    getAllPhases();
    setEventOpen(false);
  }

  function closePhaseModal() {
    getAllPhases();
    setPhaseOpen(false);
  }

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

    //console.log("onClickSchedule", e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback((event) => {
    // use the schedule data to use it in the modal
    setEventInfo({
      ...eventInfo,
      start_date: event.start.toDate(),
      end_date: event.end.toDate(),
    });
    setPhaseInfo({
      ...phaseInfo,
      start_date: event.start.toDate(),
      end_date: event.end.toDate(),
    });
    // Need to open the choice modal to select bewteen creating an event or a phase
    openChoiceModal();
  }, []);

  const onBeforeDeleteSchedule = useCallback(async (event) => {
    console.log("onBeforeDeleteSchedule", event);

    const { id, calendarId } = event.schedule;
    try {
      await axios.delete(`${admin_url}/phases/${id}`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      });
      if (schedule.type.raw === "event") {
        await axios.delete(`${admin_url}/events/${calendarId}`, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
      }
    } catch (error) {
      console.error(error);
    }
    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((event) => {
    console.log("onBeforeUpdateSchedule", event);

    const { schedule, changes } = event;
    setEventEdit(true);
    setPhaseEdit(true);

    let newStartDate, newEndDate;

    if (!changes) {
      newStartDate = schedule.start.toDate();
      newEndDate = schedule.end.toDate();
    } else {
      newStartDate = changes.start
        ? changes.start.toDate()
        : schedule.start.toDate();
      newEndDate = changes.end ? changes.end.toDate() : schedule.end.toDate();
    }

    if (schedule.raw.type === "event") {
      setEventInfo({
        ...schedule,
        start_date: newStartDate,
        end_date: newEndDate,
      });
    } else {
      setPhaseInfo({
        ...schedule,
        start_date: newStartDate,
        end_date: newEndDate,
      });
    }
    schedule.raw.type === "event" ? openEventModal() : openPhaseModal();
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
    popupDetailDate: function (isAllDay, start, end) {
      const start_date = `${("0" + start.getDate()).slice(-2)}/${(
        "0" +
        (start.getMonth() + 1)
      ).slice(-2)}/${start.getFullYear()}`;
      const start_time = `${("0" + start.getHours()).slice(-2)}h${(
        "0" + start.getMinutes()
      ).slice(-2)}`;

      const end_date = `${("0" + end.getDate()).slice(-2)}/${(
        "0" +
        (end.getMonth() + 1)
      ).slice(-2)}/${end.getFullYear()}`;
      const end_time = `${("0" + end.getHours()).slice(-2)}h${(
        "0" + end.getMinutes()
      ).slice(-2)}`;

      var isSameDate = start_date === end_date ? true : false;

      if (isAllDay) {
        return start_date + (isSameDate ? "" : " - " + end_date);
      }

      return `<p><strong>${start_time} - ${end_time}</strong> (${
        start_date + (isSameDate ? "" : " - " + end_date)
      })</p>`;
    },
    popupDetailUser: (data) => {
      console.log("data", data);
      var ret = "";
      for (const [index, attendee] of data.attendees.entries()) {
        ret += index === 0 ? attendee + "<ul>": "<li>" + attendee + "</li>";
        ret += "</ul>";
        if (index > 3) {
          ret += "[...]";
          break;
        }
      }
      ret += "<div>Contact régisseur : " + (data.raw?.tech_manager_contact ? data.raw?.tech_manager_contact : "N/A") + "</div>" ;
      ret += "<div>Contact sur place : " + (data.raw?.provider_contact ? data.raw?.provider_contact : "N/A") + "</div>" ;
      ret += "<br/>";
      ret += "<div><strong>Type : " + data.raw?.type.charAt(0).toUpperCase() + data.raw?.type.slice(1) + "</strong></div>";
      return ret;
    },
    popupDetailLocation: (data) => {
      var ret = `<em>${data.raw.address.main} - ${data.raw.address.zip_code} ${data.raw.address.city}</em>`;
      ret += `<div><em>${data.location}</em></div>`;
      return ret;
    },
    popupDetailBody: (phaseDetails) => {
      var ret = "<div>Commentaires : " + phaseDetails.body + "</div>" ;
      return ret;
    },
  };

  return (
    <div className="calendar">
      <Modal
        closeIcon
        onClose={closeChoiceModal}
        onOpen={openChoiceModal}
        open={choiceOpen}
        size="mini"
      >
        <Modal.Header>Créer un événement ou une phase</Modal.Header>
        <Modal.Actions>
          <Button content="Evenement" onClick={openEventModal} />
          <Button content="Phase" onClick={openPhaseModal} />
        </Modal.Actions>
      </Modal>

      <Modal
        closeIcon
        onClose={closeEventModal}
        onOpen={openEventModal}
        open={eventOpen}
      >
        <Modal.Header>
          {eventEdit ? "Modifier un événement" : "Créer un événement"}
        </Modal.Header>
        <Modal.Content>
          <EventForm
            eventInfo={eventInfo}
            eventEdit={eventEdit}
            setEventEdit={setEventEdit}
            closeEventModal={closeEventModal}
          />
        </Modal.Content>
      </Modal>

      <Modal
        closeIcon
        onClose={closePhaseModal}
        onOpen={openPhaseModal}
        open={phaseOpen}
        size="large"
      >
        <Modal.Header>
          {phaseEdit ? "Modifier une phase" : "Créer une phase"}
        </Modal.Header>
        <Modal.Content>
          <PhaseForm
            users={usersWithJob}
            events={events}
            phaseInfo={phaseInfo}
            phaseEdit={phaseEdit}
            setPhaseEdit={setPhaseEdit}
            closePhaseModal={closePhaseModal}
          />
        </Modal.Content>
      </Modal>

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

      <TUICalendar
        ref={cal}
        height="600px"
        view="week"
        week={{
          startDayOfWeek: 1,
          daynames: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
        }}
        taskView={false}
        useCreationPopup={false} // "false" to use our form instead of app Popup
        useDetailPopup={true}
        template={templates}
        calendars={events}
        schedules={phases}
        theme={darkTheme}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </div>
  );
};

// export default Calendar;
export default MyCalendar;
