import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import axios from "../../utils/axios";

import QuestionWithSolution from "../../components/common/QuestionWithSolution";
import BackButton from "../../components/common/BackButton";
const ExamInfoDetails = lazy(() => import("../../components/common/ExamInfoDetails"));
const LogoTopCenter = lazy(() => import("../../components/LogoTopCenter"));


const ExamSolution = () => {
  const params = useParams();
  const [TOKEN, setTOKEN] = useState(null);
  const [examData, setExamData] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  useEffect(() => {
    setTOKEN(localStorage.getItem("STDNTTKN"));
  });

  useEffect(() => {
    if (TOKEN) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;

      Promise.all([
        axios.get('/api/student/viewsollution?examId=' + params.exam_code),
        axios.get('/api/exam/getexambyid?examId=' + params.exam_code)
      ]).then(res => {
        setExamData(res[0].data);
        setExamDetails(res[1].data);
      }).catch(err => {
        console.log(err);
        window.alert("Something went wrong, please inform us");
      });
    }
  }, [TOKEN, params.exam_code]);

  return (
    <div className="px-28 md:px-4">
      <div className="container mx-auto">
        <Suspense fallback={null}>
          <LogoTopCenter />
        </Suspense>
        {/* examInoDetails */}
        <div className="mb-8">
          {
            examDetails ?
              <Suspense fallback={(<Skeleton count={1} height={128}></Skeleton>)}><ExamInfoDetails examInfos={examDetails} /></Suspense>
              : <Skeleton count={1} height={128}></Skeleton>
          }

          <div className="border border-color-4 px-6 md:px-2 py-6 md:py-4 mt-4">
            {examData ? examData.map((question, index) => (
              <QuestionWithSolution question={question} index={++index} key={index} />
            )) : (<Skeleton count={5} height={128}></Skeleton>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSolution;
