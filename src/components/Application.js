import React from "react";
import "./Application.scss";
import DayList from "./DayList.js";
import Appointment from "components/Appointment/index.js";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors';
import useApplicationData from '../hooks/useApplicationData';


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

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
