import { Suspense, lazy, useEffect, useState } from "react";

import axios from "../../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import RightArrow from '../../components/common/svg/RightArrow';
import backIcon from "../../assets/img/leftArrow.png";
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
    <>
      <div className="flex flex-row bg-white text-center mb-8">
        <div className='h-[68px] mx-auto'>
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className='w-64' />
          </Link>
        </div>
      </div>
      <div className="px-4">
        <div className="max-w-3xl container mx-auto pt-8 pb-24">
          {/* exam content */}
          <div className="grid grid-cols-6 gap-2 mt-4">
            <div className="col-start-2 md:col-start-1 col-span-4 md:col-span-6 ">

              {/* user input box */}
              {examDetails &&
                (<div className="border border-color-six mt-4 px-12 md:px-4 py-8 mb-4 md:py-4 rounded-lg bg-white">
                <h2 className="font-bold text-3xl text-center text-title-2">My Profile</h2>
                <form onSubmit={onSubmitHandler}>
                  <div className="form-control mb-4">
                    <label className="label font-bold relative">
                      <span className="absolute top-1 left-3 bg-white px-2 text-title-2">Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="Enter your name"
                      className="input border-2 border-title-2 focus:border-orange-600"
                    />
                  </div>
                  {
                    examDetails.sscStatus && (
                      <>
                        <div className="form-control mb-4">
                          <label className="label font-bold relative">
                            <span className="absolute top-1 left-3 bg-white px-2 text-title-2">SSC Roll no</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="sscRoll"
                            placeholder="SSC Roll no"
                            className="input border-2 border-title-2 focus:border-orange-600"
                          />
                        </div>
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="absolute top-1 left-3 bg-white px-2 text-title-2">SSC Registration no</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="sscReg"
                            placeholder="SSC Registration no"
                            className="input border-2 border-title-2 focus:border-orange-600"
                          />
                        </div>
                      </>
                    )
                  }
                  {
                    examDetails.hscStatus && (
                      <>
                        <div className="form-control mb-4">
                          <label className="label font-bold relative">
                            <span className="absolute top-1 left-3 bg-white px-2 text-title-2">HSC Roll no</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="hscRoll"
                            placeholder="HSC Roll no"
                            className="input border-2 border-title-2 focus:border-orange-600"
                          />
                        </div>
                        <div className="form-control mb-4">
                          <label className="label font-bold relative">
                            <span className="absolute top-1 left-3 bg-white px-2 text-title-2">HSC Registration no</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="hscReg"
                            placeholder="HSC Registration no"
                            className="input border-2 border-title-2 focus:border-orange-600"
                          />
                        </div>
                      </>
                    )
                  }
                  <div className="form-control mb-4">
                    <label className="label font-bold relative">
                      <span className="absolute top-1 left-3 bg-white px-2 text-title-2">Institution Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="institution"
                      placeholder="Enter institution name"
                      className="input border-2 border-title-2 focus:border-orange-600"
                    />
                  </div>
                  <div className="form-control mb-4 ">
                    <label className="label font-bold relative">
                      <span className="absolute top-1 left-3 bg-white px-2 text-title-2">Mobile Number</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="mobileNo"
                      placeholder="Enter mobile number"
                      className={`input border-2 ${checkNumber !== "" ? 'border-rose-600' : 'border-title-2'} focus:border-orange-600`}
                      onChange={(e) => checkNumberFunction(e)}
                    />
                  </div>
                  {/* start exam button */}
                  <div className="form-control mb-4">
                    <button type="submit" className="btn-hover border-0 rounded-md py-3 pr-1 my-4 disabled:bg-color-five" disabled={checkNumber}>
                      Continue to Exam
                      <span className='btn-hover_icon'><RightArrow /></span>
                    </button>
                  </div>
                </form>

                <BackButton
                  title="Back to exam page"
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
    </>
  );
};

export default BeforeStart;
