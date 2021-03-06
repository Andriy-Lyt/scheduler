import React, {useState} from "react";
import InterviewerList from "components/InterviewerList"; 
import Button from "components/Button"; 

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate(name, interviewer) {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  const reset = () => {
    setStudent("");
    setError("");
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer ? interviewer : props.interviewerId}
          onChange={onChange}  
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => { validate(student, interviewer) } }>Save</Button>
        </section>
      </section>
    </main>
  );
}
