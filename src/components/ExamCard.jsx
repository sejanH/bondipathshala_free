import React from "react";
import { Link } from "react-router-dom";

function ExamCard({ exam, variation = 'daily' }) {
  return exam.map((data, index) => (
    <div className="examItem" key={index}>
      <Link to={`/exam-by-subject/${data._id}/${variation}`}>
        {/* <img src={`${process.env.REACT_APP_FILES_HOST}/${data.iLink}`} className="w-full" alt={data.name} /> */}
        <div className="text-center py-16 text-[32px]">{data.name}</div>
      </Link>
    </div>
  ));
}

export default ExamCard;
