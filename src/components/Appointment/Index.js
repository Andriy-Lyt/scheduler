import React from 'react';
import './styles.scss';
import Header from "./Header"; 
import Show from "./Show"; 
import Empty from "./Empty"; 
import Form from "./Form"; 
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


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
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE,true));
  }

  //edit() funct
  function edit(studentName, interviewer) {
    save(studentName, interviewer);
  }

  //deleteInterview() funct
  function deleteInterview() {

    transition(DELETING, true); //show the DELETING indicator
    
    const interview = null;
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }


  return(
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
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
          student={props.interview.student}
          interviewerId={props.interview.interviewer.id}
        />
      )}
      {mode === SAVING && <Status message="Saving.."/>}
      {mode === ERROR_SAVE && <Error message="Error saving appointment" onClose={back}/>}
      {mode === CONFIRM && 
        <Confirm 
          onCancel={back} 
          onConfirm={deleteInterview} 
          message="Ok to Delete Interview?"
        />}
      {mode === DELETING && <Status message="Deliting.."/>}
      {mode === ERROR_DELETE && <Error message="Error deleting appointment" onClose={back}/>}
    </article>
  )
}