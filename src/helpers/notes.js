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


//INPUT
const input = {
  "id": 1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    }
  }
}; 

//OUTPUT
const output = {
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}

/* function getPlayers(array) {
  let players = [];

  for(let obj of array) {
    if(!players.includes(obj.winner) ) {
        players.push(obj.winner);
    }
     if(!players.includes(obj.loser) ) {
        players.push(obj.loser);
    }
  }
  return players.sort();
}

loop over array of objects and get the name of 1st winner;
add the name of the looser from the same object into loosers array for that winner;

check if any other object inside an array has the same winner 
as the 1st has, if it does - add loosers from other objects to the array of loosers for this particular winner.

Repeat above steps for the winner in the every next object,
while doing that we need to check if current winner did not exist in the previous object. */

state.appointments["3"].interview)