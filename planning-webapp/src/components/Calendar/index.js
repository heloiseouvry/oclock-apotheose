// import React from 'react';
import React, { useCallback, useRef } from 'react';
import TUICalendar from '@toast-ui/react-calendar';

// Import react-modal to use it instead of app's Popup
import Modal from 'react-modal';

import Form from '../Form';
import data from '../../data/data.js';

// import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const myTheme = {
  // Theme object to extends default dark theme.
};

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
// const schedules: ISchedule[] = [
const schedules = [
  {
    calendarId: "1",
    category: "time",
    isVisible: true,
    title: "Study",
    id: "1",
    body: "Test",
    start,
    end
  },
  {
    calendarId: "2",
    category: "time",
    isVisible: true,
    title: "Meeting",
    id: "2",
    body: "Description",
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  }
];

// const calendars: ICalendarInfo[] = [
const calendars = [
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
    bgColor: "#9e5fff",
    dragBgColor: "#9e5fff",
    borderColor: "#9e5fff"
  },
  {
    id: "2",
    name: "Company",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  }
];

// Style for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const MyCalendar = () => {
  const cal = useRef(null);

  // variable & fonction for the modal
  let subtitle;
  let modalStartDate;
  let modalEndDate;

  const [editingPhase, setEditingPhase] = React.useState(null);

  // React.useState crée un couple variable (qui fait partie de mon composant) et fonction pour modifier cette variable
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // passer setIsOpen(true) passe ma variable modalIsOpen à true, je peux donc la modifier, mais je ne peux pas utliser ma variable ici, elle est passé ne props à mon composant
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }


  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    console.log('onClickSchedule',e , el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    console.log("onBeforeCreateSchedule", scheduleData);
    // use the schedule data to use it in the modal
    modalStartDate = scheduleData.start;
    modalEndDate = scheduleData.end;
    // Need to open the modal to add an event
    openModal();
  }, []);


  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log("onBeforeDeleteSchedule",res);

    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log("onBeforeUpdateSchedule", e);

    const { schedule, changes } = e;

    setEditingPhase(e.schedule);
    openModal();
    
    //TODO décaler ce qu'il y a en dessous dans le onSubmit
    //il va falloir détecter si je suis en train de modifier ou de créer
    // rappel : si editingPhase est null alors je crée, si editingPhase contient des données alors je suis en train de modifier


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

  const onSubmitCreate = (eventFromForm) => {
    var schedule = {
      id: String(Math.random()),
      title: eventFromForm.target.name.value,
      isAllDay: false,
      // les 2 lignes d'après sont attribuées dans onCreateSchedule
      //TODO à récupérer depuis le event.target
      start: modalStartDate,
      end: modalEndDate,
      category:  'time',
      raw: {
        techID : parseInt(eventFromForm.target.techName.value, 10),
      },
      calendarId: "1",
      // Schedule.body is basic text, not possible to put anything but string
      body: "test",
    };
    /* step2. save schedule */
    // @ts-ignore: Object is possibly 'null'.
    
    // TODO ici je dois prévoir d'envoyer le schedule à sauvegarder en BDD
    //potientiellement ajax.post
    //avec une fausse ID
    //auquel je passe une callback avec ce qu'il y a à executer en cas de retour valide j'execute le createschedule (ligne juste en dessous) qui comportera tous l'objet schedule definitif avec l'ID généré par le back
    cal.current.calendarInst.createSchedules([schedule]);
  };

  const onSubmitUpdate = (eventFromForm) => {
    console.log("eventFromForm.target.IDHidden.value", parseFloat(eventFromForm.target.IDHidden.value));
    console.log("eventFromForm.target.calendarIdHidden.value", eventFromForm.target.calendarIdHidden.value);
    console.log("eventFromForm.target.name.value", eventFromForm.target.name.value);
    console.log("eventFromForm.target.techName.value", eventFromForm.target.techName.value);

    // TODO check informations I send
    cal.current.calendarInst.updateSchedule(
      parseFloat(eventFromForm.target.IDHidden.value),
      parseInt(eventFromForm.target.calendarIdHidden.value, 10),
      {
        title: eventFromForm.target.name.value,
        raw:{
          techID : parseInt(eventFromForm.target.techName.value, 10),
        },
      }
    );
  };

  const onSubmit = useCallback((event) => {
    event.preventDefault(event);
    // ici avec event.target.techName.value je récupère l'ID de mon tech depuis le select du Form.js
    console.log("je suis event.target.techName.value", event.target.techName.value);
    console.log("je suis modalStartDate", modalStartDate);
    console.log("je suis modalEndDate", modalEndDate);

    //TODO faure le test pour appeler le bon onSubmit

    console.log("event.target.createHidden.value", event.target.createHidden.value);
    if (event.target.createHidden.value == "false") {
      console.log("uptdate");
      onSubmitUpdate(event);
    }
    else {
      console.log("create");
      onSubmitCreate(event);
    }
    setEditingPhase(null);
    closeModal();

  }, []);

  const templates = {
    time: function (schedule) {
      console.log('time', schedule);
      return getTimeTemplate(schedule, false);
    },
  //   collapseBtnTitle: function() {
  //     return '<span className="tui-full-calendar-icon tui-full-calendar-ic-arrow-solid-top"></span>';
  // },
    popupDetailBody: (phaseDetails) => {
      console.log(`popupDetailBody`, phaseDetails);
      var ret="<div>"+phaseDetails.body;
      ret += "<ul>";

      var techFound = data.find((elementTech) => {
        console.log("tech Find=", elementTech);
        console.log("elementTech.id=", elementTech.id);
        console.log("phaseDetails.raw.techID=", phaseDetails.raw.techID);
        return elementTech.id === phaseDetails.raw.techID;
      });
      console.log("techFound=", techFound);

      ret += "<li>"+techFound.prenom +" "+ techFound.nom+"</li>";

      ret += "</ul>";
      ret += "</div>";
      return ret;
    },  
  };

  return (
    <div className="App">
      <h1>Welcome to TOAST Ui Calendar</h1>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <Form onSubmit={onSubmit} techList={data} currentPhase={editingPhase} />
      </Modal>

      <TUICalendar
        ref={cal}
        height="1000px"
        view="week"
        // useCreationPopup={false} to use our form instead of app Popup
        useCreationPopup={false}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </div>
  );
}


// export default Calendar;
export default MyCalendar;
