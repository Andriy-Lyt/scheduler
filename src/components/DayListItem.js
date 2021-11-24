import React from 'react';
import classNames from "classnames";
import '../styles/DayListItem.scss';

export default function DayListItem(props) {

 const formatSpots = () => {
   let spotsText = '';

    if (props.spots === 1) {
       spotsText = `${props.spots} spot remaining`;
    }
    else if (props.spots === 0) {
       spotsText = 'no spots remaining';
    }
    else if (props.spots > 1) {
       spotsText = `${props.spots} spots remaining`;
    }
    return spotsText;
  }  
 
  let dayClass = {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0 ? 0 : undefined 
  }
  let DayListItemClass = classNames(dayClass);

  return (
    <li className={DayListItemClass} onClick= {props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()} </h3>
    </li>
  )
} 