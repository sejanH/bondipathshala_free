import { Suspense, lazy, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import BackButton from "../../components/common/BackButton";
import backIcon from "../../assets/img/icons/leftArrow.svg";
import RightArrow from '../../components/common/svg/RightArrow';

const Toast = lazy(() => import("../../components/common/Toast"));
const Modal = lazy(() => import("../../components/common/Modal"));

const ExamRules = () => {
  const [params] = useState(new URLSearchParams(window.location.search));
  const navigate = useNavigate();

  const [TOKEN, setTOKEN] = useState(null);
  const [examDetails, setExamDetails] = useState();
  const [examRules, setExamRules] = useState();
  const [btnText, setBtnText] = useState("Start Exam");
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState("Start Exam");
  useEffect(() => {
    setTOKEN(sessionStorage.getItem("FREESTDNTTKN"));
  },[params.get('examId')]);

  useEffect(() => {
    if (TOKEN) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;

      Promise.all([
        axios.get('/api/freestudent/getexambyid?examId=' + params.get('examId')),
        axios.get('/api/exam/examruleget?examId=' + params.get('examId'))
      ]).then(res => {
        setExamDetails(res[0].data);
        setExamRules(res[1].data);
        // setExamRules(res[0].data);
      }).catch(err => {
        window.alert("Something went wrong, please inform us");
        console.log(err);
      });
    }
  }, [TOKEN, params.get('examId')]);

  const doMagic = () => {
    setBtnText("Checking");
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
    axios.get('/api/freestudent/examcheckmiddleware?eId=' + params.get('examId'))
      .then(({ data }) => {
        setBtnText("Checking Complete");
        if (data === "assign") {
          setBtnText("Assigning questions");
          axios.get('/api/freestudent/startexam?eId=' + params.get('examId'))
            .then(({ data }) => {
              navigate(`/ongoing?examId=${params.get('examId')}`);
            }).catch(err => {
              console.log(err);
              let errMsg = err?.response?.data || 'Something went wrong';
              setError({ message: errMsg, cssClass: 'error text-white bg-color-one w-[260px]', position: 'center', alignment: 'middle' });
              setBtnText('Start Exam');
            })
        } else if (data === "running") {
          navigate(`/ongoing?examId=${params.get('examId')}`);
        } else {
          navigate(`/ongoing?examId=${params.get('examId')}`);
          setModalData({ title: "Can't start now", message: "Exam has ended" });
          document.getElementById('my-modal-3').checked = true;
          setBtnText('Start Exam');
        }
      }).catch(err => {
        console.log(err);
        let errMsg = err?.response?.data || 'Something went wrong';
        setError({ message: errMsg, cssClass: 'error text-white bg-color-one w-[260px]', position: 'center', alignment: 'middle' });
        setBtnText('Start Exam');
      })
  }

  return (
    <>
      <div className="flex flex-row bg-white text-center mb-8 ">
        <div className='h-[68px] mx-auto'>
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className='w-64' />
          </Link>
        </div>
      </div>
      <div className="px-28 md:px-4">
        <div className="max-w-3xl container mx-auto pt-8 py-24 min-h-body">
          {/* exam content */}
          <div className="grid grid-cols-6  mt-4">
            <div className="col-start-2 md:col-start-1 col-span-4 md:col-span-6 headerShadow ">

              <div className="flex btn-theme rounded-t-xl py-1 justify-center">
                <span className="text-2xl font-bold capitalize text-white">{examDetails?.name} <span className="md:hidden">(Free Live Exam)</span></span>
              </div>
              {/* user input box */}
              <div className="p-4  md:py-4 rounded-e-md bg-white">
                <Suspense fallback={null}>
                  <Toast {...error} />
                </Suspense>
                  <div className="flex flex-row flex-wrap justify-center mb-12 space-x-4">
                    <div className="examSummery_col py-2">
                      <span className="examSummery_col_top">Total Questions</span>
                      <span className="examSummery_col_bottom">{examDetails?.totalQuestionMcq}</span>
                    </div>
                    <div className="examSummery_col py-2">
                      <span className="examSummery_col_top">Marks per Question</span>
                      <span className="examSummery_col_bottom">{examDetails?.marksPerMcq}</span>
                    </div>
                    <div className="examSummery_col py-2">
                      <span className="examSummery_col_top">Full<br />Marks</span>
                      <span className="examSummery_col_bottom">{examDetails?.totalMarksMcq}</span>
                    </div>
                    <div className="examSummery_col py-2">
                      <span className="examSummery_col_top">Time<br />(Minutes)</span>
                      <span className="examSummery_col_bottom">{examDetails?.duration}</span>
                    </div>
                    <div className="examSummery_col py-2">
                      <span className="examSummery_col_top">Negative<br />Marks</span>
                      <span className="examSummery_col_bottom">{examDetails?.negativeMarks}%</span>
                    </div>
                  </div>
                {/* exam rules */}
                <div className="border border-color-six px-2 py-2 rounded-md">
                  <div className="text-center text-xl text-color-one h-7 relative">
                    <span className="p-1 rounded-md btn-theme text-white absolute -top-7 left-[50%] -translate-x-[50%]">
                      পরীক্ষার নিয়মাবলী
                    </span>
                  </div>
                  {
                    examRules && (<img src={`${process.env.REACT_APP_FILES_HOST}/${examRules?.ruleILink}`} />)
                  }
                </div>
                <div className="block">
                  {btnText === "Start Exam" ? (<button type="button" className="w-full text-center btn-hover border-0 text-white rounded-md py-3 mt-6 mb-4" onClick={doMagic}>{btnText}
                    <span className='btn-hover_icon'><RightArrow /></span></button>) :
                    (<button type="button" className="w-full text-center btn-hover border-0 text-white rounded-md py-3 mt-6 mb-4" disabled="disabled" onClick={doMagic}>{btnText}                        <span className='btn-hover_icon'><RightArrow /></span></button>)}

                </div>
                <BackButton
                  title="Back to exam page"
                  url={`/before-start?exmId=${params.get('examId')}`}
                  icon={backIcon}
                />
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <Modal {...modalData} />
        </Suspense>
      </div>
    </>
  );
};

export default ExamRules;
