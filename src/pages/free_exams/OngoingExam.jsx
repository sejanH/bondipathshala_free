/* eslint-disable-line */
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import ExamInfoDetails from "../../components/common/v2/ExamInfoDetails";
import CountDownTwo from "../../components/common/CountDownTwo";
import RightArrow from "../../components/common/svg/RightArrow";
import Question from "../../components/common/Question";
import Modal from "../../components/common/v2/ResultSummery";
import Modal2 from "../../components/common/v2/Modal";

const OngoingExam = () => {
  const navigate = useNavigate();
  const [params] = useState(new URLSearchParams(window.location.search));
  const [TOKEN, setTOKEN] = useState(null);
  const [modalMessage, setModalMessage] = useState(
    "You have already completed the exam or Exam time is over!"
  );
  const [timer, setTimer] = useState(0);
  const [examData, setExamData] = useState(null);
  const [exam, setExam] = useState({});
  const [runningData, setRunningData] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [examIsLive, setExamIsLive] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTOKEN(sessionStorage.getItem("FREESTDNTTKN"));
    console.log(sessionStorage.getItem("FREESTDNTTKN"));
    if (!sessionStorage.getItem("FREESTDNTTKN")) {
      alert("You already attempted this exam!");
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const storedExamDetails = localStorage.getItem(
      `${params.get("examId")}details`
    );
    if (storedExamDetails) {
      // console.log(JSON.parse(storedExamDetails));
      setExamData(JSON.parse(storedExamDetails));
      setExam(JSON.parse(storedExamDetails));
    }
  }, [params]);
  useEffect(() => {
    if (TOKEN) {
      // window.scrollTo(0,0)
      setIsLoading(true);
      window.location.hash = "#countDownDiv";
      axios.defaults.headers.common["Authorization"] = "Bearer " + TOKEN;
      let assigned = JSON.parse(localStorage.getItem("assigned"));
      let flagVar = false;
      for (let i = 0; i < assigned.length; i++) {
        if (
          assigned[i].examId === params.get("examId") &&
          assigned[i].runningData == true
        ) {
          flagVar = true;
        }
      }
      if (flagVar) {
        console.log("eikhane dhukar kotha");
        const getData = JSON.parse(
          localStorage.getItem(`${params.get("examId")}runningDetails`)
        );
        console.log(getData);
        setRunningData(getData);

        const takeTimer = JSON.parse(
          localStorage.getItem(`${params.get("examId")}timing`)
        );
        const examEndUTC = new Date(takeTimer.examEndTime);
        const correctedDate = new Date(
          examEndUTC.getTime() - 6 * 60 * 60 * 1000
        );
        console.log("load howar por dhukse ");
        setTimer(correctedDate);
        setIsLoading(false);
      } else {
        axios
          .get("/api/freestudent/getquestiondata?eId=" + params.get("examId"))
          .then(({ data }) => {
            console.log(data);
            localStorage.setItem(
              `${params.get("examId")}runningDetails`,
              JSON.stringify(data)
            );
            setRunningData(data);
            // setTimer(new Date("2025-10-10T12:00:00Z"));
            let assigned = JSON.parse(localStorage.getItem("assigned"));
            // console.log(assigned,);
            if (assigned.length > 0) {
              // console.log("dhukse");
              for (let i = 0; i < assigned.length; i++) {
                // console.log(i, assigned[i].examId, params.get("examId"));
                if (assigned[i].examId === params.get("examId")) {
                  assigned[i].runningData = true;
                }
              }
            }
            localStorage.setItem("assigned", JSON.stringify(assigned));
            let _answers = data.map((d) => d.answeredOption);
            localStorage.setItem(
              params.get("examId"),
              JSON.stringify(_answers)
            );
            const storedExamDetails = localStorage.getItem(
              `${params.get("examId")}details`
            );
            const takeTimer = JSON.parse(
              localStorage.getItem(`${params.get("examId")}timing`)
            );
            // console.log(takeTimer);
            const examEndUTC = new Date(takeTimer.examEndTime);
            const correctedDate = new Date(
              examEndUTC.getTime() - 6 * 60 * 60 * 1000
            );
            console.log(correctedDate);
            setTimer(correctedDate);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            if (err.response?.status == 409) {
              alert("you already attempted the exam");
              navigate("/");
              openModal();
            }
            console.log(err);
          });
        window.scrollTo(0, 0);
      }
    }
  }, [TOKEN, navigate, params]);

  function openModal() {
    let checkedModal = document.getElementById("pop-up-modal");
    checkedModal.checked = true;
  }

  // const handleQuestionSelect = (event, activeQuestion) => {
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
  //   axios.put('/api/freestudent/updatequestion', {
  //     examId: params.get('examId'),
  //     questionIndexNumber: activeQuestion,
  //     optionIndexNumber: event.target.value
  //   }).then(({ data }) => {
  //     if (data === "Ok") {
  //       let all = runningData;
  //       all[activeQuestion].answeredOption = event.target.value;
  //       setRunningData([...all]);
  //     }
  //   }).catch(err => {
  //     if (err.response?.status == 409) {
  //       openModal();
  //     }
  //     console.log(err);
  //   })
  // }

  const handleQuestionSelectLocal = (event, activeQuestion) => {
    let all = runningData;
    all[activeQuestion].answeredOption = event.target.value;
    // console.log(all);
    localStorage.removeItem(`${params.get("examId")}runningDetails`);
    localStorage.setItem(
      `${params.get("examId")}runningDetails`,
      JSON.stringify(all)
    );
    setRunningData([...all]);

    let _local = JSON.parse(localStorage.getItem(params.get("examId")));
    _local[activeQuestion] = event.target.value;
    localStorage.setItem(params.get("examId"), JSON.stringify(_local));
  };
  const handleSubmit = () => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + TOKEN;
    let _local = JSON.parse(localStorage.getItem(params.get("examId")));
    axios
      .post("/api/freestudent/submitanswer?eId=" + params.get("examId"), {
        answeredOptions: _local,
        runningData: runningData,
        examData: examData,
      })
      .then(({ data }) => {
        // localStorage.removeItem(params.get("examId"));
        sessionStorage.removeItem("FREESTDNTTKN");
        sessionStorage.removeItem("FREESTDNTID");
        sessionStorage.removeItem("FREEEXAMID");
        setModalMessage(
          "Your exam has been submitted and is awaiting evaluation."
        );
        openModal();
      })
      .catch((err) => {
        if (err.response?.status == 409) {
          openModal();
        }
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex flex-row bg-white text-center mb-8">
        <div className="h-[68px] mx-auto">
          <Link to={"/"}>
            <img src="/images/logo.png" alt="logo" className="w-64" />
          </Link>
        </div>
      </div>
      {isLoading ? (
        <>
          <div className="flex items-center justify-center h-40">
            <div className="flex space-x-2 text-xl text-gray-600 font-semibold">
              <span className="animate-bounce [animation-delay:0ms]">L</span>
              <span className="animate-bounce [animation-delay:100ms]">o</span>
              <span className="animate-bounce [animation-delay:200ms]">a</span>
              <span className="animate-bounce [animation-delay:300ms]">d</span>
              <span className="animate-bounce [animation-delay:400ms]">i</span>
              <span className="animate-bounce [animation-delay:500ms]">n</span>
              <span className="animate-bounce [animation-delay:600ms]">g</span>
              <span className="animate-bounce [animation-delay:700ms]">.</span>
              <span className="animate-bounce [animation-delay:800ms]">.</span>
              <span className="animate-bounce [animation-delay:900ms]">.</span>
            </div>
          </div>
        </>
      ) : (
        <div className="px-28 md:px-4">
          <div className="pb-8 container mx-auto max-w-4xl">
            {/* examInoDetails */}
            <div className="bg-white rounded-xl" tabIndex={0} id="countDownDiv">
              {examData && (
                <div className="flex btn-theme rounded-t-xl py-1 justify-center">
                  <span className="text-2xl font-bold capitalize text-white">
                    Free Live Exam
                  </span>
                </div>
              )}
              {timer > 0 && (
                <div className="bg-white sticky top-0 pb-2 z-50">
                  <CountDownTwo
                    date={timer}
                    completedAction={handleSubmit}
                    autoSubmit={false}
                    setExamIsLive={setExamIsLive}
                  />
                </div>
              )}
              {examData && <ExamInfoDetails examInfos={examData} />}
              <div className="p-6">
                {examIsLive ? (
                  <>
                    {runningData ? (
                      runningData.map((question, index) => (
                        <Question
                          question={question}
                          index={index}
                          key={index}
                          handleQuestionSelect={handleQuestionSelectLocal}
                        />
                      ))
                    ) : (
                      <Skeleton count={5} height={128}></Skeleton>
                    )}
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl text-red-700 font-bold text-center mt-8 ">
                      সময় শেষ !! ফলাফল পেতে হলে এক্সাম সাবমিট কর।
                    </h1>
                  </>
                )}
                {/* submit ans */}
                <div className="text-center my-4 max-w-sm mx-auto">
                  <button
                    className="btn-hover text-white font-bold pr-2 py-3 rounded-md"
                    onClick={handleSubmit}
                  >
                    Submit Answer
                    <span className="btn-hover_icon">
                      <RightArrow />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal2 {...error} />
      <Modal {...result} />
      <input type="checkbox" id="pop-up-modal" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box pb-0">
          <div className="my-0 py-0 h-10 bg-orange-600 text-white text-center flex items-center justify-center ">
            <p className="font-bold">{exam.name}</p>
          </div>
          <h3 className="font-bold text-2xl text-center my-6 text-red-600 ">
            {modalMessage}
          </h3>
          <p className="text-center text-2xl font-bold text-green-500">
            Best Wishes!
          </p>
          <div className="modal-action flex justify-right mb-1 ">
            <label
              htmlFor="pop-up-modal"
              onClick={() => navigate("/")}
              className="btn bg-red-600 text-white"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngoingExam;
