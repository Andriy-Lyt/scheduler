import React from 'react';
import './styles.scss';
import Header from "./Header"; 
import Show from "./Show"; 
import Empty from "./Empty"; 
import Form from "./Form"; 
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  // console.log("props.interview, index.js ln 20: ", props.interview);

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

  //edit() funct
  function edit(studentName, interviewer) {
    save(studentName, interviewer);
  }


  //deleteInterview() funct
  function deleteInterview() {

    transition(DELETING); //show the DELETING indicator

    const interview = null;
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY));
  }


  return(
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          onEdit={edit}
          student={props.interview.student}
          interviewerId={props.interview.interviewer.id}
        />
      )}
      {mode === SAVING && <Status message="Saving.."/>}
      {mode === CONFIRM && 
        <Confirm 
          onCancel={back} 
          onConfirm={deleteInterview} 
          message="Ok to Delete Interview?"
        />}
      {mode === DELETING && <Status message="Deliting.."/>}
    </article>
  )
}