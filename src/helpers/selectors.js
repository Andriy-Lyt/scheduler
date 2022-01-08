
//getAppointmentsForDay() -------------------
 function getAppointmentsForDay(state, day) {
  let apptsIDsAr = []; // array of apts IDs
  let apptsForGivenDay = []; //array of appts objects

  for(let dayObj of state.days) {
    if(dayObj.name === day) {
      apptsIDsAr = dayObj.appointments.slice(0);
      break;
    }
  };

  for(let key in state.appointments) {
    if(apptsIDsAr.includes(state.appointments[key].id)){
      apptsForGivenDay.push(state.appointments[key]);
    }
  }
  return apptsForGivenDay;
}

//getInterviewersForDay() -------------------
function getInterviewersForDay(state, day) {
  let interviewersIDsAr = []; // array of interviewers IDs
  let interviewersForGivenDay = []; //array of interviewers objects
  

  for(let dayObj of state.days) {
    if(dayObj.name === day) {
      interviewersIDsAr = [...dayObj.interviewers];
      break;
    }
  };

  for(let key in state.interviewers) {
    if(interviewersIDsAr.includes(state.interviewers[key].id)){
      interviewersForGivenDay.push(state.interviewers[key]);
    }
  }
  return interviewersForGivenDay;
}


 function getInterview(state, interview) {
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




