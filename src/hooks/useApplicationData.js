import { useState, useEffect } from "react";
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

    useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, 
          appointments: all[1].data, interviewers: all[2].data }))
      });

      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "SET_INTERVIEW") {
        }
      };
    }, [])

  const setDay = day => setState({ ...state, day });

  //bookInterview() funct, id means appointment_id
  function bookInterview(id, interview) {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
    };

    const getSpotsForDay = (day) => {
      
      const appointmentsLength = day.appointments.length;
      const totalAppointments = day.appointments.reduce((count, id) => {
        if (appointments[id].interview) {
          return count + 1;
        }
        return count;
      }, 0)
      return appointmentsLength - totalAppointments;
    }

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return {...day, spots: getSpotsForDay(day) }
      }
      return day;
    })

      return axios.put('/api/appointments/'+id, {interview})
      .then((response) => {
        setState({
          ...state,
          days,
          appointments,
        });  
      });
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
  
      //test added ----------------
      const getSpotsForDay = (day) => {
      
        const appointmentsLength = day.appointments.length;
        const totalAppointments = day.appointments.reduce((count, id) => {
          if (appointments[id].interview) {
            return count + 1;
          }
          return count;
        }, 0)
        return appointmentsLength - totalAppointments;
      }
  
      const days = state.days.map((day) => {
        if (day.appointments.includes(id)) {
          return {...day, spots: getSpotsForDay(day) }
        }
        return day;
      })
  

    //return
      return axios.delete('/api/appointments/'+id, {interview})
      .then((response) => {
        setState({
          ...state,
          days,
          appointments
        });  
      });
  }
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}
