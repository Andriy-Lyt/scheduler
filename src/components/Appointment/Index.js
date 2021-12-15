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
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  

  //save() funct
  function save(studentName, interviewer) {
    const interview = {
      student: studentName,
      interviewer: interviewer
    };
    
    transition(SAVING); //show the SAVING indicator

    props.bookInterview(props.id, interview) // id means appointment_Id
    .then(() => transition(SHOW));
  }

  //deleteInterview() funct
  function deleteInterview(studentName, interviewer) {
    const interview = {
      student: studentName,
      interviewer: interviewer
    };

    transition(DELETING); //show the DELETING indicator

    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY));
  }

  return(
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
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
      {mode === DELETING && <Status message="Deliting.."/>}
    </article>
  )
}