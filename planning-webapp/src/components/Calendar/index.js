// import React from 'react';
import React, { useCallback, useRef, useState, useEffect } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import { Button, Modal, Header, Image, Icon } from "semantic-ui-react";
import axios from "axios";

// Import react-modal to use it instead of app's Popup
// import Modal from "react-modal";
import ConnectedHeader from "../ConnectedHeader";
import Form from "../Form";
import EventForm from "../EventForm";
import PhaseForm from "../PhaseForm";
import data from "../../data/data.js";

// import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

const host = "100.25.136.194";
const port = "4000";
const router = "admin";
const base_url = `http://${host}:${port}/${router}`;

const myTheme = {
  // Theme object to extends default dark theme.
};

// Style for the modal
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};

// Modal.setAppElement("#root");

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
      const response = await axios.get(`${base_url}/phases`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      });
      let phasesToAdd = [];
      for (const phaseBack of response.data) {
        // console.log("phaseBack", phaseBack);
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
        // console.log("phaseFront", phaseFront);

        phasesToAdd.push(phaseFront);
      }
      setPhases(phasesToAdd);
    } catch (error) {
      console.error(error);
    }
  };

  // getAllUsersWithJob();
  const getAllUsersWithJob = async () => {
    const response = await axios.get(`${base_url}/usersjob`, {
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

  // passer setIsOpen(true) passe ma variable modalIsOpen à true, je peux donc la modifier, mais je ne peux pas utliser ma variable ici, elle est passé ne props à mon composant
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

  function toggleEvent(e, button) {
    if (e.target.dataset.visible) {
      cal.current.calendarInst.toggleSchedules(button.content, true);
      e.target.dataset.visible = false;
    } else {
      cal.current.calendarInst.toggleSchedules(button.content, false);
      e.target.dataset.visible = true;
    }
  }

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    console.log("onClickSchedule", e, el.getBoundingClientRect());
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
      await axios.delete(`${base_url}/phases/${id}`, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      });
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
    const newStartDate = changes.start ? changes.start.toDate() : schedule.start.toDate();
    const newEndDate = changes.end ? changes.end.toDate() : schedule.end.toDate();
    if (schedule.raw.type === "event") {
      setEventInfo({...schedule,
        start_date: newStartDate,
        end_date: newEndDate,
      });
    } else {
      setPhaseInfo({...schedule,
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
      // console.log("time", schedule);
      return getTimeTemplate(schedule, false);
    },
    popupDetailBody: (phaseDetails) => {
      // console.log(`popupDetailBody`, phaseDetails);
      var ret = "<div>" + phaseDetails.body;
      ret += "<p><strong>" + phaseDetails.raw?.type + "</strong></p>";
      ret += "<ul>";
      ret += "</ul>";
      ret += "</div>";
      return ret;
    }
  };

  return (
    <div className="App">
      <Modal
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

      <Modal onClose={closeEventModal} onOpen={openEventModal} open={eventOpen}>
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

      <Button size="mini" content="<" secondary onClick={prevView} />
      <Button size="mini" content="Jour" secondary onClick={dayView} />
      <Button size="mini" content="Semaine" secondary onClick={weekView} />
      <Button size="mini" content="Mois" secondary onClick={monthView} />
      <Button size="mini" content=">" secondary onClick={nextView} />
      <Button size="mini" content="Aujourd'hui" secondary onClick={todayView} />

      {/* {events.map((e) => (
        <Button
          key={e.id}
          size="mini"
          content={e.id}
          circular
          data-visible={true}
          onClick={toggleEvent}
        />
      ))} */}

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
