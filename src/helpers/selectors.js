/*   const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2]
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
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }

};
 */

//getAppointmentsForDay() -------------------
 function getAppointmentsForDay(state, day) {
  let apptsIDsAr = []; // array of apts IDs
  let apptsForGivenDay = []; //array of appts objects

  for(let dayObj of state.days) {
    if(dayObj.name === day) {
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

//getInterviewersForDay() -------------------
function getInterviewersForDay(state, day) {
  let interviewersIDsAr = []; // array of interviewers IDs
  let interviewersForGivenDay = []; //array of interviewers objects
  // console.log( "state.days[0]:", state.days[0]);
  // console.log('');
  

  for(let dayObj of state.days) {
    if(dayObj.name === day) {
      interviewersIDsAr = [...dayObj.interviewers];
      // console.log("interviewersIDsAr, line 79: ", interviewersIDsAr);
      // console.log("dayObj.interviewers, lime 80: ", dayObj.interviewers);
      break;
    }
  };

  for(let key in state.interviewers) {
    if(interviewersIDsAr.includes(state.interviewers[key].id)){
      interviewersForGivenDay.push(state.interviewers[key]);
    }
  }
  // console.log("interviewersForGivenDay", interviewersForGivenDay);
  return interviewersForGivenDay;
}


 function getInterview(state, interview) {
  //  console.log("interview: selectors.js, line 54", interview);
    if (!interview) {
      return null;
    }
    const interviewerId = interview.interviewer;
    return ({
      "student": interview.student,
      "interviewer": state.interviewers[interviewerId]
    });
}

export {getAppointmentsForDay, getInterview, getInterviewersForDay};

//Tests for getInterviewersForDay() ------------
/* console.log('test 2');
console.log("getInterviewersForDay returns an array with a length matching the number of Interviewers for that day");
console.log(getInterviewersForDay(state, "Monday").length == 2);
console.log(getInterviewersForDay(state, "Monday"));
console.log('');
 */

//Tests for getAppointmentsForDay() ------------
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

 //Tests for getInterview() ------------
// console.log("getInterview returns an object with the interviewer data");
// console.log(getInterview(state, state.appointments["3"].interview));
// console.log('');

// console.log("getInterview returns null if no interview is booked");
// console.log(getInterview(state, state.appointments["2"].interview) === null);




