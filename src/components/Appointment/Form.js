import React, {useState} from "react";
import InterviewerList from "components/InterviewerList"; 
import Button from "components/Button"; 

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // console.log("student:", student);
  // console.log("interviewer state, in Form.js line 9:", interviewer );
  // console.log("props.interviewer.id, in Form.js line 10:", props.interviewer.id || null );

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }
  const onChange = (id) => {
    setInterviewer(id);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer ? interviewer : props.interviewerId}
          onChange={onChange}  
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => { props.onSave(student, interviewer) } }>Save</Button>
        </section>
      </section>
    </main>
  )
}