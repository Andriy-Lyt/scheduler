import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {

let buttonClass = classNames(
  {
      button: true,
      " button--confirm": props.confirm ? true : false,
      " button--danger": props.danger ? true : false
    });

  return <button onClick={props.onClick} disabled={props.disabled} className={buttonClass}>{props.children}</button>;
}