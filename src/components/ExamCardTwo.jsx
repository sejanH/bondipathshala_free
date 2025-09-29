import React from "react";
import { Link } from "react-router-dom";
function ExamCardTwo({ exam, freeExam = false }) {
  return (
    <div className="upcoming">
      {freeExam ? <Link to={`/before-start?examId=${exam._id}`}>
        <img className="w-full" src={process.env.REACT_APP_FILES_HOST + "/" + exam.iLink} alt={exam.name} />
        <div className="timer_container flex flex-row p-2 align-center items-center">
          <div className="timer_container__timer grow text-3xl md:text-xl">
            {/* <Link className="text-3xl md:text-xl" to={`/exam/${exam._id}/before-start`}> */}
            Start Exam
            {/* </Link> */}
          </div>
          <div className="timer_container__icon2">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg></span>
          </div>
        </div>
      </Link> : <Link to={`/exam/${exam._id}/before-start`}>
        <img className="h-64 w-full" src={process.env.REACT_APP_FILES_HOST + "/" + exam.iLink} alt={exam.name} />
        <div className="timer_container flex flex-row p-2 align-center items-center">
          <div className="timer_container__timer grow text-3xl md:text-xl">
            {/* <Link className="text-3xl md:text-xl" to={`/exam/${exam._id}/before-start`}> */}
            Start Exam
            {/* </Link> */}
          </div>
          <div className="timer_container__icon2">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg></span>
          </div>
        </div>
      </Link>}
    </div>
  );
}

export default ExamCardTwo;
