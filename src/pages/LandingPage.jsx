import { useState, useEffect, Suspense, lazy } from 'react'
import axios from "../utils/axios";
import RightArrow from '../components/common/svg/RightArrow';
import { Link } from 'react-router-dom';

const LogoTopCenter = lazy(() => import("../components/LogoTopCenter"));

const LandingPage = () => {
    const [freeExam, setFreeExam] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("STDNTTKN")) {
            window.location.href = '/home';
        }

        if (!sessionStorage.getItem("freeExam")) {
            axios.get('/api/freestudent/getfreeexamid')
                .then(res => {
                    setFreeExam(res.data?._id);
                    sessionStorage.setItem('freeExam', JSON.stringify(res.data));
                }).catch(err => {
                    console.log(err);
                });
        } else {
            const res = JSON.parse(sessionStorage.getItem("freeExam"));
            if (res) {
                setFreeExam(res._id);
            }
        }
    }, []);

    return (
        <div className="container mx-auto min-h-without-footer items-center pt-[90px]">
            <Suspense fallback={null}>
                <LogoTopCenter />
            </Suspense>
            <div className="flex flex-row px-4 items-center">
                {
                    freeExam && (
                        <div className="basis-full max-w-sm mx-auto relative block">
                            <Link to={`/before-start?examId=${freeExam}`}
                                className="font-bold block btn-hover border-0 py-3 pr-2 my-8 text-white">Start Exam
                                <span className='btn-hover_icon'><RightArrow /></span>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LandingPage