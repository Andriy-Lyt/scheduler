import React, { useState, useEffect } from "react";
import "./Application.scss";
import DayList from "./DayList.js";
import Appointment from "components/Appointment/index.js";
import axios from 'axios';
import {getAppointmentsForDay, getInterview} from '../helpers/selectors';


const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png",
};  

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {

  //STATE --------
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {
      "1": {
        "id": 1,
        "name": "Sylvia Palmer",
        "avatar": "https://i.imgur.com/LpaY82x.png"
      }
    }
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  //bookInterview() funct, id means appointment_id
  function bookInterview(id, interview) {
    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put('/api/appointments/'+id, {interview})
    .then((response) => {
      setState({
        ...state,
        appointments
      });  
    })
  } // closing bookInterview()

  //cancelInterview() funct
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete('/api/appointments/'+id, {interview})
    .then((response) => {
      setState({
        ...state,
        appointments
      });  
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, 
        appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>

      <section className="schedule">
        { dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          // console.log("appointment.interview: ", appointment.interview);

          return (
            <div>
              <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={state.interviewers}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
              />
              <Appointment key="last" time="5pm" />
            </div>
          );
          })
         }   

      </section>
    </main>
  );
}
