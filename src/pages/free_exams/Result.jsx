import { useState, Suspense, lazy } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import RightArrow from "../../components/common/svg/RightArrow";

const Modal2 = lazy(() => import("../../components/common/Modal"));
const Modal = lazy(() => import("../../components/common/v2/ResultSummery"));

const Result = () => {
  const [freeExams, setFreeExams] = useState([]);
  const [error, setError] = useState(null);
  const [examId, setexamId] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [resultDetails, setResultDetails] = useState();
  const [studentId, setStudentId] = useState("");

  const checkNumberFunction = (value) => {
    const reg = /^(01[3-9]\d{8})$/;
    return reg.test(value);
  };

  function openModal() {
    let checkedModal = document.getElementById("pop-up-modal");
    checkedModal.checked = true;
  }

  const handleSubmit = () => {
    if (checkNumberFunction(mobileNo)) {
      axios
        .get(
          `/api/freestudent/getrankfree?examId=${examId}&mobileNo=${mobileNo}`
        )
        .then(({ data }) => {
          setResultDetails({
            bgColor: "none",
            result: data,
            customWidth: "max-w-4xl",
          });
          let checkedModal = document.getElementById("my-modal-4");
          document.getElementById("mobileno").value = "";
          checkedModal.checked = true;
          checkedModal.addEventListener("change", (e) => {
            if (e.target.checked === false) {
              setexamId("");
              setmobileNo("");
            }
          });
          setFreeExams([]);
        })
        .catch((err) => {
          console.log(err);
          setError({ message: err.response?.data || "Something went wrong" });

          let checkedModal = document.getElementById("my-modal-3");
          checkedModal.checked = true;
        });
    } else {
      setError({ message: "Number not valid" });
      openModal();
    }
  };

  const doAction = () => {
    window.location.reload(false);
  };

  const checkMobile = async (val) => {
    if (val.length === 11) {
      setmobileNo(val);
      await axios
        .get("/api/freestudent/examvsmobile?mobileNo=" + val)
        .then(({ data }) => {
          setFreeExams(data);
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong");
        });

      axios
        .get(`/api/freestudent/getfreestudentmobile?mobileNo=${val}`)
        .then(({ data }) => setStudentId(data._id))
        .catch(() => alert("সঠিক মোবাইল নাম্বার দাও"));
    } else if (val.length > 11) {
      alert("১১ ডিজিটের বেশী দিয়েছো");
      document.getElementById("mobileno").value = "";
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-center bg-white text-center mb-8">
        <div className="h-[68px]">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className="w-48 md:w-64" />
          </Link>
        </div>
      </div>

      {/* Main Section */}
      <div className="px-4 md:px-10 lg:px-20">
        <div className="pb-8 container mx-auto max-w-4xl min-h-body">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-center text-base md:text-lg font-medium">
                মোবাইল নাম্বার দিন, এরপরে আপনার লিস্ট থেকে এক্সাম সিলেক্ট করে
                নিন!
              </h2>
            </div>

            {/* Input always on top + Select always below */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                id="mobileno"
                placeholder="তোমার মোবাইল নাম্বার লিখ"
                className="input input-bordered w-full"
                onChange={(e) => checkMobile(e.target.value)}
              />
              <select
                className="select select-bordered w-full"
                value={examId}
                disabled={freeExams.length === 0}
                onChange={(e) => setexamId(e.target.value)}
              >
                <option value="">Select the exam</option>
                {freeExams?.map((d, i) => (
                  <option key={i} value={d.examId._id}>
                    {d.examId.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <button
                className="btn-hover text-white font-bold py-3 px-5 rounded-md disabled:bg-slate-300 flex items-center justify-center"
                disabled={examId === "" || !mobileNo}
                onClick={handleSubmit}
              >
                Get Result
                <span className="btn-hover_icon ml-2">
                  <RightArrow />
                </span>
              </button>
              <Link
                to={`/exams/${studentId}/${examId}/freesolution`}
                className={`btn-hover text-white font-bold py-3 px-5 rounded-md flex items-center justify-center ${
                  examId === "" || !mobileNo
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >
                Get Solution
                <span className="btn-hover_icon ml-2">
                  <RightArrow />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Suspense fallback={null}>
        <Modal2 {...error} />
      </Suspense>
      <Suspense fallback={null}>
        <Modal {...resultDetails} />
      </Suspense>

      <input type="checkbox" id="pop-up-modal" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box pb-0">
          <div className="my-0 py-0 h-10 bg-orange-600 text-white text-center flex items-center justify-center">
            <p className="font-bold">Notice</p>
          </div>
          <h3 className="font-bold text-xl md:text-2xl text-center my-6 text-red-600">
            No Student found!
          </h3>
          <div className="modal-action flex justify-end mb-1">
            <label
              htmlFor="pop-up-modal"
              onClick={() => doAction()}
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

export default Result;
