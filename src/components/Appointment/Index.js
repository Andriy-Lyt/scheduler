import React from 'react';
import './styles.scss';
import Header from "./Header"; 
import Show from "./Show"; 
import Empty from "./Empty"; 
import Form from "./Form"; 
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //show the SAVING indicator
    transition(SAVING);

    props.bookInterview(props.id, interview) // id means appointment_Id
    .then(() => {transition(SHOW)});
    ;

    // console.log("appointmentId: ", props.id, "interview: ", props.interview);
    // console.log("interviewer index.js line 27", interviewer);
    
  }

  return(
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
      )}
      {mode === SAVING && <Status message="Saving.."/>}
    </article>
  )
}