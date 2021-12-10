import React from 'react';
import DayListItem from "./DayListItem"; 

export default function DayList(props){

  const printDays =  props.days.map((day) => {
    console.log("props.value, DayList.js line 7: ",props.value);
   return(
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={() => props.onChange(props.name)} 
      />
    )
  });

  return(
    <ul>
      {printDays}
    </ul>
  )
}