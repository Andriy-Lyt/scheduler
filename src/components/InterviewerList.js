import React from 'react';
import InterviewerListItem from "./InterviewerListItem"; 
import '../styles/InterviewerList.scss';

export default function InterviewerList(props) {

  const printInterviewers = props.interviewers.map((interviewer) => {
    // console.log("interviewer.name: ", interviewer.name, "props.interviewer:", props.interviewer);
    return(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}  
      />
    )
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