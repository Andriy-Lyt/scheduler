import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
    
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
      interview: interview
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

  
  return {
    state,
    // setState,
    setDay,
    bookInterview,
    cancelInterview,
    // useEffect
  }
}