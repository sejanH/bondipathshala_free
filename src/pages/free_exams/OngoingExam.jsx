import { useState, useEffect, Suspense, lazy } from "react";
import moment from 'moment';
import axios from "../../utils/axios";
import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { useNavigate } from "react-router-dom";
import ExamInfoDetails from "../../components/common/v2/ExamInfoDetails";
import CountDownTwo from "../../components/common/CountDownTwo";
import RightArrow from '../../components/common/svg/RightArrow';
import Question from "../../components/common/Question";
const Modal = lazy(() => import("../../components/common/Modal"));

const types = {
  1: "daily exam",
  2: "weekly exam",
  3: "monthly exam",
};
const OngoingExam = () => {

  const [params] = useState(new URLSearchParams(window.location.search));
  const navigate = useNavigate();
  const [homeUrl, setHomeUrl] = useState("/");
  const [TOKEN, setTOKEN] = useState(null);
  const [timer, setTimer] = useState(0);
  const [examData, setExamData] = useState(null);
  const [runningData, setRunningData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTOKEN(sessionStorage.getItem("FREESTDNTTKN"));
    if (sessionStorage.getItem("FREESTDNTTKN")) {
      setHomeUrl("/");
    }
  }, []);
  useEffect(() => {
    if (TOKEN) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;

      axios.get('/api/freestudent/examcheckmiddleware?eId=' + params.get('examId'))
        .then(({ data }) => {
          if (data === "assign") {
            navigate(`/exam/rules?examId=${params.get('examId')}`);
          } else if (data === "running") {
            axios.get('/api/freestudent/getrunningdata?eId=' + params.get('examId'))
              .then(({ data }) => {
                setExamData(data.examData);
                setRunningData(data.questionData);
                let maxDuration = moment.utc(data.timeData.endTine).subtract(6, 'h');
                let lastTime = moment(maxDuration);
                setTimer(lastTime.valueOf());

                if (lastTime.isAfter(data.examData.endTime)) {
                  maxDuration = moment.utc(data.timeData.endTine).diff(data.timeData.startTime, "m");
                  lastTime = moment(moment.utc(data.timeData.startTime).add(maxDuration, "m"));
                  setTimer(lastTime.valueOf());
                }
              }).catch(err => {
                console.log(err);
              })
          } else {
            setError({ title: "Can't start now", message: "Exam has ended" });
            let checkedModal = document.getElementById('my-modal-3')
            checkedModal.checked = true;
            checkedModal.addEventListener('change', (e) => {
              if (e.target.checked === false) {
                navigate('/');
              }
            });

          }
        })
    }
  }, [TOKEN, params.get('examId')]);


  const handleQuestionSelect = (event, activeQuestion) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
    axios.put('/api/freestudent/updatequestion', {
      examId: params.get('examId'),
      questionIndexNumber: activeQuestion,
      optionIndexNumber: event.target.value
    }).then(({ data }) => {
      if (data == "Ok") {
        let all = runningData;
        all[activeQuestion].answeredOption = event.target.value;
        setRunningData([...all]);
      }
    }).catch(err => {
      console.log(err);
    })
  }
  const handleSubmit = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
    axios.post('/api/freestudent/submitanswer?eId=' + params.get('examId'))
      .then(({ data }) => {
        // let messageHtml = `<table class="table w-full"><tr><td>Rank: ${data.rank}</td><td>Total Marks (MCQ): ${data.totalMarksMcq}</td></tr>
        // <tr><td>Correct: ${data.totalCrrectAnswer}</td><td>Wrong: ${data.totalWrongAnswer}</td></tr>
        // <tr><td>Obtained: ${data.totalObtained}/${data.totalMarksMcq}</td><td>Not Answered: ${data.totalNotAnswered}</td></tr></table>`;
        // setError({ title: "Exam result", message: messageHtml, showHtml: true, bgColor: 'primary' })


        setError({ bgColor: 'none',result:data, customWidth: 'max-w-4xl' });
        let checkedModal = document.getElementById('my-modal-4')
        checkedModal.checked = true;
        checkedModal.addEventListener('change', (e) => {
          if (e.target.checked === false) {
            navigate('/');
          }
        });
      }).catch(err => {
        console.log(err);
      })
  }

  return (<>
    <div className="flex flex-row bg-white text-center mb-8">
      <div className='h-[68px] mx-auto'>
        <Link to={homeUrl}>
          <img src="/images/logo.png" alt="logo" className='w-64' />
        </Link>
      </div>
    </div>
    <div className="px-28 md:px-4">
      <div className="pb-8 container mx-auto max-w-4xl">
        {/* examInoDetails */}
        <div className="bg-white rounded-xl">
          {examData && (<div className="flex btn-theme rounded-t-xl py-1 justify-center">
            <span className="text-2xl font-bold capitalize text-white">{types[examData.examType]}</span>
          </div>)}
          {timer > 0 && <div className="bg-white sticky top-0">
            <CountDownTwo date={timer} completedAction={handleSubmit} />
          </div>}
          {examData && <ExamInfoDetails examInfos={examData} />}
          <div className="p-6">
            {runningData ? runningData.map((question, index) => (
              <Question question={question} index={index} key={index} handleQuestionSelect={handleQuestionSelect} />
            )) : (<Skeleton count={5} height={128}></Skeleton>)}
            {/* submit ans */}
            <div className="text-center my-4 max-w-sm mx-auto">
              <button className="btn-hover text-white font-bold pr-2 py-3 rounded-md" onClick={handleSubmit}>
                Submit Answer
                <span className='btn-hover_icon'><RightArrow /></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <Modal {...error} />
      </Suspense>
    </div>
  </>
  );
};

export default OngoingExam;
