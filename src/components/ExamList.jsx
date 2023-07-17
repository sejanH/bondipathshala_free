import React from "react";
import { Link } from "react-router-dom";
import ExamCard from "./ExamCard";

function ExamList({ title, exam, hideViewAll = false, exam_slug='' }) {
  return (
    <div className="bg-white homePageBottom relative rounded-xl border border-border-color px-3 pt-16 pb-3 md:pb-12 lg:mb-18 mb-24">
      <h1 className="text-4xl bg-white text-white bg-title-2 w-64 p-2 rounded-lg text-center">
        {title}
      </h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-1 gap-4 md:gap-2 ">
        <ExamCard exam={exam} variation={exam_slug}/>

        {!hideViewAll && (
          <>
            <Link className="btn-view-all btn-theme" to={`/exam-list/${exam_slug}/all`}>
              <span className="block text-base">View</span>
              <span className="block text-base">All</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ExamList;
