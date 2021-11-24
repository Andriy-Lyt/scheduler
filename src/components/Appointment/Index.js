import React from 'react';
import classNames from "classnames";
import './styles.scss';

export default function Appointment(props) {
  let text = props.time ? "Appoint at 12 pm" : "no appoint";

  return(
    <article className="appointment">{text}</article>
  )
}