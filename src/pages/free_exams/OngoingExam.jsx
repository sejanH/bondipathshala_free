/* eslint-disable-line */
import { useState, useEffect } from "react";
import moment from 'moment';
import axios from "../../utils/axios";
import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { useNavigate } from "react-router-dom";
import ExamInfoDetails from "../../components/common/v2/ExamInfoDetails";
import CountDownTwo from "../../components/common/CountDownTwo";
import RightArrow from '../../components/common/svg/RightArrow';
import Question from "../../components/common/Question";
import Modal from "../../components/common/v2/ResultSummery";
import Modal2 from "../../components/common/v2/Modal";

const OngoingExam = () => {

  const navigate = useNavigate();
  const [params] = useState(new URLSearchParams(window.location.search));
  const [homeUrl, setHomeUrl] = useState("/");
  const [TOKEN, setTOKEN] = useState(null);
  const [modalMessage, setModalMessage] = useState("You have already completed the exam or Exam time is over!");
  const [timer, setTimer] = useState(0);
  const [examData, setExamData] = useState(null);
  const [exam, setExam] = useState({});
  const [runningData, setRunningData] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    
    window.scrollTo(0,0)
    setTOKEN(sessionStorage.getItem("FREESTDNTTKN"));
    if (sessionStorage.getItem("FREESTDNTTKN")) {
      setHomeUrl("/");
    }
  }, []);
  useEffect(() => {
    if (TOKEN) {
      window.scrollTo(0,0)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;

      axios.get('/api/freestudent/examcheckmiddleware?eId=' + params.get('examId'))
        .then(({ data }) => {
          if (data === "assign") {
            navigate(`/exam/rules?examId=${params.get('examId')}`);
          } else if (data === "running") {
            window.scrollTo(0,0)
            axios.get('/api/freestudent/getrunningdata?eId=' + params.get('examId'))
              .then(({ data }) => {
                setExamData(data.examData);
                // setRunningData(data.questionData);


                if (!localStorage.getItem(params.get('examId'))) {
                  setRunningData(data.questionData);
                  let _answers = data.questionData.map((d) => d.answeredOption);
                  localStorage.setItem(params.get('examId'), JSON.stringify(_answers));
                } else {
                  let _local = JSON.parse(localStorage.getItem(params.get('examId')));
                  data.questionData.map((d, index) => {
                    if (_local[index] !== "-1") {
                      d.answeredOption = _local[index];
                    }
                  });
                  setRunningData(data.questionData);
                }
                let maxDuration = moment.utc(data.timeData.endTine).subtract(6, 'h');
                let lastTime = moment(maxDuration);
                setTimer(lastTime.valueOf());

                if (lastTime.isAfter(data.examData.endTime)) {
                  maxDuration = moment.utc(data.timeData.endTine).diff(data.timeData.startTime, "m");
                  lastTime = moment(moment.utc(data.timeData.startTime).add(maxDuration, "m"));
                  setTimer(lastTime.valueOf());
                }
              }).catch(err => {
                if (err.response?.status == 409) {
                  openModal();
                }
                console.log(err);
              })
          } else {
            setError({ title: "Can't start now", message: "Exam has ended" });
            axios.get(`/api/freestudent/getexambyid?examId=${params.get('examId')}`).then(({ data }) => {
              console.log(data);
              setExam(data)
              openModal();
            })


          }
        }).catch(err => {
          navigate('/');
          console.log(err.response?.status);
        })
    }
  }, [TOKEN, navigate, params]);

  function openModal() {
    let checkedModal = document.getElementById('pop-up-modal')
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
    setRunningData([...all]);

    let _local = JSON.parse(localStorage.getItem(params.get('examId')));
    _local[activeQuestion] = event.target.value;
    localStorage.setItem(params.get('examId'), JSON.stringify(_local));
  }
  const handleSubmit = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
    let _local = JSON.parse(localStorage.getItem(params.get('examId')));
    axios.post('/api/freestudent/submitanswer?eId=' + params.get('examId'),{ answeredOptions: _local })
      .then(({ data }) => {

        localStorage.removeItem(params.get('examId'));
        setModalMessage("Your exam has been submitted and is awaiting evaluation.");
        openModal();
      }).catch(err => {
        if (err.response?.status == 409) {
          openModal();
        }
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
            <span className="text-2xl font-bold capitalize text-white">Free Live Exam</span>
          </div>)}
          {timer > 0 && <div className="bg-white sticky top-0 pb-2 z-50">
            <CountDownTwo date={timer} completedAction={handleSubmit} autoSubmit={false} />
          </div>}  
          {examData && <ExamInfoDetails examInfos={examData} />}
          <div className="p-6">
            {runningData ? runningData.map((question, index) => (
              <Question question={question} index={index} key={index} handleQuestionSelect={handleQuestionSelectLocal} />
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

    </div>
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
        <p className="text-center text-2xl font-bold text-green-500">Best Wishes!</p>
        <div className="modal-action flex justify-right mb-1 ">
          <label htmlFor="pop-up-modal" onClick={() => navigate('/')} className="btn bg-red-600 text-white">
            Close
          </label>
        </div>
      </div>
    </div>

  </>
  );
};

export default OngoingExam;
