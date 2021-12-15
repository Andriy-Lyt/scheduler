import React from 'react';
import classNames from "classnames";
import '../styles/InterviewerListItem.scss';

export default function InterviewerListItem(props) {

  let interviewersClass = {
    "interviewers__item": true,
    "interviewers__item--selected": props.selected  ? true : false
  }
  
  return (
    <li className={classNames(interviewersClass)} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-img"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}