
import { useState, useEffect, Suspense, lazy } from "react";
import axios from "../../utils/axios";
import { Link } from 'react-router-dom';
import RightArrow from '../../components/common/svg/RightArrow';
const Modal2 = lazy(() => import("../../components/common/Modal"));
const Modal = lazy(() => import("../../components/common/v2/ResultSummery"));

const Result = () => {

    const [freeExams, setFreeExams] = useState();
    const [error, setError] = useState(null);
    const [examId, setexamId] = useState("");
    const [mobileNo, setmobileNo] = useState("");
    const [resultDetails, setResultDetails] = useState();

    useEffect(() => {
        axios.get('/api/freestudent/getfreeexamall')
            .then(({ data }) => {
                setFreeExams(data);
            }).catch(err => {
                console.log(err);
                setError("Something went wrong");
            })
    }, []);

    const checkNumberFunction = (value) => {

        const reg = /^(01[3-9]\d{8})$/;
        let valid_number = reg.test(value);
        return valid_number;
    }
    function openModal(){
        let checkedModal = document.getElementById('pop-up-modal')
        checkedModal.checked = true;
      }
    const handleSubmit = () => {
        if (checkNumberFunction(mobileNo)) {
            axios.get(`/api/freestudent/getrankfree?examId=${examId}&mobileNo=${mobileNo}`)
                .then(({ data }) => {
                    setResultDetails({ bgColor: 'none', result: data, customWidth: 'max-w-4xl' });
                    let checkedModal = document.getElementById('my-modal-4')
                    checkedModal.checked = true;
                    checkedModal.addEventListener('change', (e) => {
                        if (e.target.checked === false) {
                            setexamId("");
                            setmobileNo("");
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    setError({ message: err.response.data });

                    let checkedModal = document.getElementById('my-modal-3')
                    checkedModal.checked = true;
                });
        } else {
            setError({ message: "Number not valid" });
            openModal();
        }
    }
    const doAction = ()=>{
        window.location.reload(false);
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
            <div className="px-28 md:px-4">
                <div className="pb-8 container mx-auto max-w-4xl min-h-body">
                    <div className="bg-white rounded-xl">
                        <div className="p-6">
                            <div className="flex flex-row md:flex-wrap">
                                <select className="md:my-1 lg:mx-1 basis-1/2 select select-bordered md:basis-full" value={examId} onChange={(e) => setexamId(e.target.value)}>
                                    <option value="">Select the exam</option>

                                    {
                                        freeExams?.map((d, i) => (<option key={i} value={d._id}>{d.name}</option>))
                                    }

                                </select>
                                <input type="text" placeholder="তোমার মোবাইল নাম্বার লিখ" className="md:my-1 lg:mx-1 basis-1/2 input input-bordered md:basis-full" value={mobileNo} onChange={(e) => setmobileNo(e.target.value)} />
                            </div>
                            <div className="text-center my-4 max-w-sm mx-auto">
                                <button className="btn-hover text-white font-bold pr-2 py-3 rounded-md disabled:bg-slate-300" disabled={examId == "" || !mobileNo} onClick={handleSubmit}>
                                    Get Result
                                    <span className='btn-hover_icon'><RightArrow /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Suspense fallback={null}>
                    <Modal2 {...error} />
                </Suspense>
                <Suspense fallback={null}>
                    <Modal {...resultDetails} />
                </Suspense>
            </div>
            <input type="checkbox" id="pop-up-modal" className="modal-toggle" />
    <div className="modal modal-middle">    
        <div className="modal-box pb-0">
          <div className="my-0 py-0 h-10 bg-orange-600 text-white text-center flex items-center justify-center ">
            <p className="font-bold">Notice</p>
          </div>
          <h3 className="font-bold text-2xl text-center my-6 text-red-600 ">
              No Student found!   
          </h3>
          <div className="modal-action flex justify-right mb-1 ">
            <label htmlFor="pop-up-modal" onClick={()=>doAction()} className="btn bg-red-600 text-white">
              Close
            </label>
          </div>
        </div>
      </div>
        </>
    )
}

export default Result