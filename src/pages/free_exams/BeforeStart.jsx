import { Suspense, lazy, useEffect, useState } from "react";

import Skeleton from 'react-loading-skeleton'
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import backIcon from "../../assets/img/leftArrow.png";
const ExamInfos = lazy(() => import("../../components/common/ExamInfos"));
const LogoTopCenter = lazy(() => import("../../components/LogoTopCenter"));
const Modal = lazy(() => import("../../components/common/Modal"));
//start exam => updtestudent
const BeforeStart = () => {
  let history = useNavigate();
  const [params] = useState(new URLSearchParams(window.location.search));
  const [freeExam, setFreeExam] = useState(null);
  const [TOKEN, setTOKEN] = useState(null);
  const [examDetails, setExamDetails] = useState();
  const [checkNumber, setCheckNumber] = useState("disabled");
  const [studentMobile, setStudentMobile] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    // setExamDetails(JSON.parse(sessionStorage.getItem("freeExam")));

    return () => {
      if (!sessionStorage.getItem("freeExam")) {
        axios.get('/api/freestudent/getfreeexamid')
          .then(res => {
            setFreeExam(res.data?._id);
            sessionStorage.setItem('freeExam', JSON.stringify(res.data));
            setExamDetails(res.data);
          }).catch(err => {
            console.log(err);
          });
      } else {
        const res = JSON.parse(sessionStorage.getItem("freeExam"));
        if (res) {
          setExamDetails(res)
          setFreeExam(res._id);
        }
      }
    }
  }, []);

  const checkNumberFunction = (e) => {

    const reg = /^(01[3-9]\d{8})$/;
    let valid_number = reg.test(e.target.value);
    if (valid_number) {
      setStudentMobile(e.target.value);
      setCheckNumber("");
    } else {
      setCheckNumber("disabled");
    }
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post("/api/freestudent/addfreestudent", formData)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          axios.post("/api/freestudent/login", { mobileNo: studentMobile })
            .then(({ data }) => {
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
              sessionStorage.setItem("FREESTDNTTKN", data.token);
              sessionStorage.setItem("FREESTDNTID", data.studentIdStr);
              sessionStorage.setItem("FREEEXAMID", params.get('examId'));
              history(`/rules?examId=${freeExam}`);
            });
        }
      }).catch(err => {
        console.log(err);
      })
  }
  return (
    <div className="px-28 md:px-4">
      <div className="container mx-auto pt-8 pb-24">
        <Suspense fallback={null}>
          <LogoTopCenter />
        </Suspense>
        {/* exam content */}
        <div className="grid grid-cols-6 gap-2 mt-4">
          <div className="col-start-2 md:col-start-1 col-span-4 md:col-span-6 ">
            {/* exam infos */}
            {examDetails ? (<Suspense fallback={<Skeleton></Skeleton>}>
              <ExamInfos
                name={examDetails?.name}
              />
            </Suspense>) : (<Skeleton height={70}></Skeleton>)}


            {/* user input box */}
            {examDetails &&
              (<div className="border border-color-six mt-4 px-12 md:px-4 py-8 mb-4 md:py-4 rounded-md">
                <form onSubmit={onSubmitHandler}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="text-black">Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="Enter your name"
                      className="input border border-border-color-5"
                    />
                  </div>
                  {
                    examDetails.sscStatus && (
                      <>
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="text-black">SSC Roll no</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="sscRoll"
                            placeholder="SSC Roll no"
                            className="input border border-border-color-5"
                          />
                        </div>
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="text-black">SSC Registration no</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="sscReg"
                            placeholder="SSC Registration no"
                            className="input border border-border-color-5"
                          />
                        </div>
                      </>
                    )
                  }
                  {
                    examDetails.hscStatus && (
                      <>
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="text-black">HSC Roll no</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="hscRoll"
                            placeholder="HSC Roll no"
                            className="input border border-border-color-5"
                          />
                        </div>
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="text-black">HSC Registration no</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="hscReg"
                            placeholder="HSC Registration no"
                            className="input border border-border-color-5"
                          />
                        </div>
                      </>
                    )
                  }
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="text-black">Institution Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="institution"
                      placeholder="Enter institution name"
                      className="input border border-border-color-5"
                    />
                  </div>
                  <div className="form-control mb-4 ">
                    <label className="label">
                      <span className="text-black">Mobile Number</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="mobileNo"
                      placeholder="Enter mobile number"
                      className={`input border ${checkNumber !== "" ? 'border-rose-600' : 'border-border-5'} focus:border-indigo-600`}
                      onChange={(e) => checkNumberFunction(e)}
                    />
                  </div>
                  {/* start exam button */}
                  <div className="form-control mb-4">
                    <button type="submit" className="block text-center bg-color-one text-white rounded-md py-4 mt-6 mb-4 disabled:bg-color-six" disabled={checkNumber}>Start Exam</button>
                  </div>
                </form>

                <BackButton
                  title="Back"
                  url="/"
                  icon={backIcon}
                />
              </div>)
            }
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <Modal {...error} />
      </Suspense>
    </div>
  );
};

export default BeforeStart;
