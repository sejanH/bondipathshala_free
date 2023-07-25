import { useState, useEffect, Suspense, lazy } from 'react'
import axios from "../utils/axios";
import ExamCardTwo from "../components/ExamCardTwo";
// import RightArrow from '../components/common/svg/RightArrow';
// import { Link } from 'react-router-dom';

const LogoTopCenter = lazy(() => import("../components/LogoTopCenter"));

const LandingPage = () => {
    const [freeExam, setFreeExam] = useState(null);
    useEffect(() => {
        sessionStorage.removeItem("FREESTDNTTKN");
        sessionStorage.removeItem("FREESTDNTID");
        sessionStorage.removeItem("FREEEXAMID");
        axios.get('/api/freestudent/getfreeexamid')
            .then(res => {
                setFreeExam(res.data);
                sessionStorage.setItem('freeExam', JSON.stringify(res.data));
            }).catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container mx-auto min-h-without-footer items-center py-[60px]">
            <Suspense fallback={null}>
                <LogoTopCenter maxWidth='max-w-xs mx-auto' />
            </Suspense>
            <div className="flex flex-row px-4 pt-8 items-center">
                {
                    freeExam && (
                        <div className="basis-full max-w-md mx-auto relative block">
                            <ExamCardTwo exam={freeExam} freeExam={true} />
                            {/* <Link to={`/before-start?examId=${freeExam}`}
                                className="font-bold block btn-hover border-0 py-3 pr-2 my-8 text-white">Start Exam
                                <span className='btn-hover_icon'><RightArrow /></span>
                            </Link> */}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LandingPage