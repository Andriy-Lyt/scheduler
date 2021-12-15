import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  // console.log("mode: ", mode);
  
  const [history, setHistory] = useState([initial]);
  // console.log("history: ", history);
  
  function transition(mode, replace = false) {
    //change mode and add another record to history
    if (!replace) {
      setMode(mode);
      history.push(mode);
    } 
    //change mode and replace current mode in history
    else {
      setMode(mode);
      history.pop();
      history.push(mode);
    }
  }

  function back() {
    if (history.length > 1) {
      let prevMode =  history.pop();
      console.log("prevMode: ", history[history.length - 1]);
      setMode(history[history.length - 1] );
    } else {
      setMode(history[0]);
      console.log("history[0] = ", history[0]);
    }
  }

  return { mode, transition, back };
}

//array.length - 1 // move to the prev mode