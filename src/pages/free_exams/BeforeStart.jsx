import { Suspense, lazy, useEffect, useState } from "react";

import axios from "../../utils/axios";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import RightArrow from "../../components/common/svg/RightArrow";
import backIcon from "../../assets/img/icons/leftArrow.svg";
const Modal = lazy(() => import("../../components/common/Modal"));
//start exam => updtestudent
const BeforeStart = () => {
  let history = useNavigate();
  const [params] = useState(new URLSearchParams(window.location.search));
  const [freeExam, setFreeExam] = useState(null);
  // const [TOKEN, setTOKEN] = useState(null);
  const [examDetails, setExamDetails] = useState();
  const [checkNumber, setCheckNumber] = useState("disabled");
  const [isLoading, setIsLoading] = useState(false);
  const [studentMobile, setStudentMobile] = useState();
  const [curriculumRoll, setCurriculmRoll] = useState(null);
  const [error] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const freeExamId = queryParams.get("examId");

  const navigate = useNavigate();

  // console.log(freeExamId);

  useEffect(() => {
    setIsLoading(true);
    // co;
    let assigned = JSON.parse(localStorage.getItem("assigned"));
    if (!assigned) {
      const obj = {
        examId: freeExamId,
        assigned: true,
        runningData: false,
      };
      let data = [];
      data.push(obj);
      localStorage.setItem("assigned", JSON.stringify(data));
    } else {
      for (let i = 0; i < assigned.length; i++) {
        if (
          assigned[i].examId === freeExamId &&
          assigned[i].runningData == true
        ) {
          history(`/ongoing?examId=${freeExamId}`);
        }
      }
    }
    axios
      .get("/api/freestudent/getexambyid?examId=" + freeExamId)
      .then(({ data }) => {
        console.log(data);
        setExamDetails(data);
        localStorage.setItem(`${freeExamId}details`, JSON.stringify(data));
        setIsLoading(false);
      });
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
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setIsLoading(true);
    axios
      .get("/api/freestudent/getexamdetails?mobileNo=" + studentMobile)
      .then(({ data }) => {
        if (data.finishedStatus) {
          window.alert("you already completed the exam");
          navigate("/");
        } else {
          axios
            .post("/api/freestudent/addfreestudent", formData)
            .then((res) => {
              if (
                parseInt(res.status) === 200 ||
                parseInt(res.status) === 201
              ) {
                axios
                  .post("/api/freestudent/login", { mobileNo: studentMobile })
                  .then(({ data }) => {
                    setIsLoading(false);
                    axios.defaults.headers.common["Authorization"] =
                      "Bearer " + data.token;
                    sessionStorage.setItem("FREESTDNTTKN", data.token);
                    sessionStorage.setItem("FREESTDNTID", data.studentIdStr);
                    sessionStorage.setItem("FREEEXAMID", params.get("examId"));
                    history(`/rules?examId=${freeExamId}`);
                  });
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex flex-row bg-white text-center mb-8">
        <div className="h-[68px] mx-auto">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className="w-64" />
          </Link>
        </div>
      </div>
      <div className="px-4">
        <div className="max-w-3xl container mx-auto pt-8 pb-24">
          {/* exam content */}
          {isLoading ? (
            <>
              <div className="flex items-center justify-center h-40">
                <div className="flex space-x-2 text-xl text-gray-600 font-semibold">
                  <span className="animate-bounce [animation-delay:0ms]">
                    L
                  </span>
                  <span className="animate-bounce [animation-delay:100ms]">
                    o
                  </span>
                  <span className="animate-bounce [animation-delay:200ms]">
                    a
                  </span>
                  <span className="animate-bounce [animation-delay:300ms]">
                    d
                  </span>
                  <span className="animate-bounce [animation-delay:400ms]">
                    i
                  </span>
                  <span className="animate-bounce [animation-delay:500ms]">
                    n
                  </span>
                  <span className="animate-bounce [animation-delay:600ms]">
                    g
                  </span>
                  <span className="animate-bounce [animation-delay:700ms]">
                    .
                  </span>
                  <span className="animate-bounce [animation-delay:800ms]">
                    .
                  </span>
                  <span className="animate-bounce [animation-delay:900ms]">
                    .
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-6 gap-2 mt-4">
              <div className="col-start-2 md:col-start-1 col-span-4 md:col-span-6 ">
                {examDetails && (
                  <div className="border border-color-six mt-4 px-12 md:px-4 py-8 mb-4 md:py-4 rounded-lg bg-white">
                    <h2 className="font-bold text-3xl text-center text-title-2">
                      My Profile
                    </h2>
                    <form onSubmit={onSubmitHandler}>
                      <div className="form-control mb-4">
                        <label className="label font-bold relative">
                          <span className="absolute top-1 left-3 bg-white px-2 text-title-2">
                            Name
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          placeholder="তোমার নাম ইংরেজিতে লিখ"
                          className="input border-2 border-title-2 focus:border-orange-600"
                        />
                      </div>

                      {examDetails.curriculumName !== null &&
                        examDetails.curriculumName !== "null" &&
                        examDetails.curriculumName !== undefined && (
                          <>
                            <div className="form-control mb-4">
                              <label className="label font-bold relative">
                                <span className="absolute top-1 left-3 bg-white px-2 text-title-2">
                                  {examDetails.curriculumName + " Roll"}
                                </span>
                              </label>
                              <input
                                type="text"
                                required
                                name="curriculumRoll"
                                placeholder={examDetails.curriculumName}
                                className="input border-2 border-title-2 focus:border-orange-600"
                              />
                            </div>
                          </>
                        )}

                      <div className="form-control mb-4">
                        <label className="label font-bold relative">
                          <span className="absolute top-1 left-3 bg-white px-2 text-title-2">
                            Institution Name
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          name="institution"
                          placeholder="তোমার স্কুল বা কলেজের সম্পুর্ন নাম ইংরেজিতে লিখ"
                          className="input border-2 border-title-2 focus:border-orange-600"
                        />
                      </div>
                      <div className="form-control mb-4 ">
                        <label className="label font-bold relative">
                          <span className="absolute top-1 left-3 bg-white px-2 text-title-2">
                            Mobile Number
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          name="mobileNo"
                          placeholder="তোমার মোবাইল নাম্বার লিখ"
                          className={`input border-2 ${
                            checkNumber !== ""
                              ? "border-rose-600"
                              : "border-title-2"
                          } focus:border-orange-600`}
                          onChange={(e) => checkNumberFunction(e)}
                        />
                        <span className="text-red-700 font-extrabold text-xl flex justify-center items-center mt-2 ">
                          No Space allowed, only 11digits
                        </span>
                        <span className="text-red-700 font-extrabold text-xl flex justify-center items-center mt-1 ">
                          example:016XXXXX456
                        </span>
                      </div>
                      {/* start exam button */}
                      <div className="form-control mb-4">
                        <button
                          type="submit"
                          className="btn-hover border-0 rounded-md py-3 pr-1 my-4 disabled:bg-color-five"
                          disabled={checkNumber}
                        >
                          Continue to Exam
                          <span className="btn-hover_icon">
                            <RightArrow />
                          </span>
                        </button>
                      </div>
                    </form>

                    <BackButton
                      title="Back to exam page"
                      url="/"
                      icon={backIcon}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Suspense fallback={null}>
          <Modal {...error} />
        </Suspense>
      </div>
    </>
  );
};

export default BeforeStart;
