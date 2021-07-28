// import React from 'react';
import React, { useCallback, useRef, useState, useEffect } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import { Button, Modal, Header, Image, Icon } from "semantic-ui-react";
import axios from "axios";

import data from "../../data/data.js";

// import Calendar from '@toast-ui/react-calendar';
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import "./styles.scss";

const host = "localhost";
const port = "4000";
const router = "v1";
const base_url = `http://${host}:${port}/${router}`;

const TechCalendar = () => {
  const [events, setEvents] = useState([]);
  const [phases, setPhases] = useState([]);

  const onBeforeCreateSchedule = (e) => {
    //console.log("onBeforeCreateSchedule e", e);
    // e.guide.clearGuideElement(); il like a preventDefault
    e.guide.clearGuideElement();
    return;
  };

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
          // console.log("phaseBack", phaseBack);
          const start_date = new Date(phaseBack.start_date);
          const end_date = new Date(phaseBack.end_date);
          let category,
            isAllDay = null;
          if (phaseBack.type === "event") {
            category = "allday";
            isAllDay = true;
          } else {
            category = "time";
            isAllDay = false;
          }
          let phaseFront = {
            id: phaseBack.id.toString(),
            calendarId: phaseBack.event_id.toString(),
            category: category,
            isVisible: true,
            isAllDay,
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
            },
            color: "#ffffff",
            bgColor: phaseBack.color
          };
          // console.log("phaseFront", phaseFront);
          // console.log("phaseFront address", phaseFront["raw"]["address"]);

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

  // passer setIsOpen(true) passe ma variable modalIsOpen à true, je peux donc la modifier, mais je ne peux pas utliser ma variable ici, elle est passé ne props à mon composant

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

    console.log("onClickSchedule", e, el.getBoundingClientRect());
  }, []);

  function getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

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

  // const onSubmitCreate = (eventFromForm) => {
  //   var schedule = {
  //     id: String(Math.random()),
  //     title: eventFromForm.target.name.value,
  //     isAllDay: false,
  //     // les 2 lignes d'après sont attribuées dans onCreateSchedule
  //     //TODO à récupérer depuis le event.target
  //     start: modalStartDate,
  //     end: modalEndDate,
  //     category: "time",
  //     // Dans l'objet raw je place les données qui ne sont pas prévues par la librairie et que je vais rendre via le template
  //     // Exemple : salaire, véhicule
  //     raw: {
  //       techID: parseInt(eventFromForm.target.techName.value, 10),
  //     },
  //     calendarId: "1",
  //     // Schedule.body is basic text, not possible to put anything but string
  //     body: "test",
  //   };
  //   /* step2. save schedule */
  //   // @ts-ignore: Object is possibly 'null'.

  //   // TODO ici je dois prévoir d'envoyer le schedule à sauvegarder en BDD
  //   //potientiellement ajax.post
  //   //avec une fausse ID
  //   //auquel je passe une callback avec ce qu'il y a à executer en cas de retour valide j'execute le createschedule (ligne juste en dessous) qui comportera tous l'objet schedule definitif avec l'ID généré par le back
  //   cal.current.calendarInst.createSchedules([schedule]);
  // };

  // const onSubmitUpdate = (eventFromForm) => {
  //   console.log(
  //     "eventFromForm.target.IDHidden.value",
  //     parseFloat(eventFromForm.target.IDHidden.value)
  //   );
  //   console.log(
  //     "eventFromForm.target.calendarIdHidden.value",
  //     eventFromForm.target.calendarIdHidden.value
  //   );
  //   console.log(
  //     "eventFromForm.target.name.value",
  //     eventFromForm.target.name.value
  //   );
  //   console.log(
  //     "eventFromForm.target.techName.value",
  //     eventFromForm.target.techName.value
  //   );

  //   // TODO check informations I send
  //   cal.current.calendarInst.updateSchedule(
  //     parseFloat(eventFromForm.target.IDHidden.value),
  //     parseInt(eventFromForm.target.calendarIdHidden.value, 10),
  //     {
  //       title: eventFromForm.target.name.value,
  //       raw: {
  //         techID: parseInt(eventFromForm.target.techName.value, 10),
  //       },
  //     }
  //   );
  // };

  // const onSubmitEvent = useCallback((event) => {
  //   event.preventDefault(event);
  //   // ici avec event.target.techName.value je récupère l'ID de mon tech depuis le select du Form.js
  //   console.log(
  //     "je suis event.target.techName.value",
  //     event.target.techName.value
  //   );
  //   console.log("je suis modalStartDate", modalStartDate);
  //   console.log("je suis modalEndDate", modalEndDate);

  //   //TODO faure le test pour appeler le bon onSubmit

  //   console.log(
  //     "event.target.createHidden.value",
  //     event.target.createHidden.value
  //   );
  //   if (event.target.createHidden.value == "false") {
  //     console.log("uptdate");
  //     onSubmitUpdate(event);
  //   } else {
  //     console.log("create");
  //     onSubmitCreate(event);
  //   }
  //   setEditingPhase(null);
  //   closeChoiceModal();
  // }, []);

  // Le template sert à rendre la vue de la phase, j'y place toutes les infos que je reçois du form via la fonction popupDetailBody(phaseDetails)
  const templates = {
    time: function (schedule) {
      console.log("time", schedule);
      return getTimeTemplate(schedule, false);
    },
    popupDetailBody: (phaseDetails) => {
      console.log(`popupDetailBody`, phaseDetails);
      var ret = "<div>" + phaseDetails.body;
      ret += "<ul>";

      //Sert à afficher les prénom et le nom du technicien sélectionné dans le form de la modal
      var techFound = data.find((elementTech) => {
        console.log("tech Find=", elementTech);
        console.log("elementTech.id=", elementTech.id);
        console.log("phaseDetails.raw.techID=", phaseDetails.raw?.techID);
        return elementTech.id === phaseDetails.raw?.techID;
      });
      console.log("techFound=", techFound);

      ret += "<li>" + techFound?.prenom + " " + techFound?.nom + "</li>";

      ret += "</ul>";
      ret += "</div>";
      return ret;
    },
  };

  return (
    <div className="App TechCalendar">
      <Button content="<" secondary onClick={prevView} />
      <Button content="Jour" secondary onClick={dayView} />
      <Button content="Semaine" secondary onClick={weekView} />
      <Button content="Mois" secondary onClick={monthView} />
      <Button content=">" secondary onClick={nextView} />
      <Button content="Aujourd'hui" secondary onClick={todayView} />

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
      />
    </div>
  );
};

// export default Calendar;
export default TechCalendar;
