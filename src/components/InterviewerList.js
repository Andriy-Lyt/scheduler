import React from 'react';
import InterviewerListItem from "./InterviewerListItem"; 
import '../styles/InterviewerList.scss';

export default function InterviewerList(props) {

  const printInterviewers = Object.values(props.interviewers).map((interviewer) => {
    return(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        //below onChange is a function declared in Forms.js line 17 and passed as props on line 37
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {printInterviewers}
      </ul>
    </section>
  )
}
