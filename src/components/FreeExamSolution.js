import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// import QuestionWithSolution from "../../components/common/QuestionWithSolution";
import ExamInfoDetails from "./common/v2/ExamInfoDetails";
import FreeMcqSolution from "./common/v2/FreeMcqSolution";
import axios from "../utils/axios";

const FreeExamSolution = () => {
  const params = useParams();
  const [examData, setExamData] = useState(null);
  const [examDetails, setExamDetails] = useState(null);

  useEffect(() => {
    axios
      .get(
        `/api/freestudent/freeStudentViewSollutionAdmin?freeStudentId=${params.studentId}&examId=${params.examId}`
      )
      .then((data) => {
        setExamData(data.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Something went wrong, please inform us");
      });

    axios
      .get("/api/exam/getExamById?examId=" + params.examId)
      .then((res) => {
        console.log(res.data);
        setExamDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Something went wrong, please inform us");
      });
  }, [params.examId, params.studentId]);

  return (
    <div className="px-0 md:px-4 lg:px-20">
      <div className="container mx-auto">
        {/* examInoDetails */}
        <div className="mb-8">
          {examDetails && <ExamInfoDetails examInfos={examDetails} />}

          <div className=" bg-white px-6 md:px-2 py-6 md:py-4 mt-4">
            {examData
              ? examData.map((question, index) => (
                  <FreeMcqSolution
                    question={question}
                    counter={++index}
                    key={index}
                  />
                ))
              : "Loading"}
          </div>
          <div className="flex justify-center mt-6">
            <Link
              to="/result"
              className="mb-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-color-one via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
            >
              ⬅ Previous Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeExamSolution;
