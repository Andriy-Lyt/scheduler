/*  const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};
 */

export default function getAppointmentsForDay(state, day) {
  let apptsIDsAr = []; // array of apts IDs
  let apptsForGivenDay = []; //array of appts objects

  for(let dayObj of state.days) {
    if(dayObj.name == day) {
      apptsIDsAr = dayObj.appointments.slice(0);
      // console.log(apptsIDsAr);
      break;
    }
  };

  for(let key in state.appointments) {
    if(apptsIDsAr.includes(state.appointments[key].id)){
      apptsForGivenDay.push(state.appointments[key]);
    }
  }
  // console.log("apptsForGivenDay", apptsForGivenDay);
  return apptsForGivenDay;
}

export default function getInterview(state, interview) {
    if (!interview) {
      return null;
    }
    return ({
      "student": state.appointments[interview]['interview'].student,
      "interviewer": state.interviewers[interview]
    })
}

//Tests ------------
/* console.log('test 1');
console.log("getAppointmentsForDay returns an array -------");
console.log(Array.isArray(getAppointmentsForDay(state, "Monday")) );
console.log('');

console.log('test 2');
console.log("getAppointmentsForDay returns an array with a length matching the number of appointments for that day");
console.log(getAppointmentsForDay(state, "Monday").length == 3);
console.log('');


console.log('test 3');
const [first, second] = getAppointmentsForDay(state, "Tuesday");
console.log(first == state.appointments["4"]);
console.log(second == state.appointments["5"]);
console.log('');


console.log('test 4');
console.log("getAppointmentsForDay returns an empty array when the days data is empty");
console.log(getAppointmentsForDay({ days: [] }, "Monday").length == 0);
 */


