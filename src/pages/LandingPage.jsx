import { useState, useEffect, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom';
import axios from "../utils/axios";
import RightArrow from '../components/common/svg/RightArrow';

const LogoTopCenter = lazy(() => import("../components/LogoTopCenter"));

const LandingPage = () => {
    const [freeExam, setFreeExam] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("STDNTTKN")) {
            window.location.href = '/home';
        }
        return ()=>{
            if (!sessionStorage.getItem("freeExam")) {
                axios.get('/api/freestudent/getfreeexamid')
                    .then(res => {
                        setFreeExam(res.data?._id);
                        sessionStorage.setItem('freeExam', JSON.stringify(res.data));
                    }).catch(err => {
                        console.log(err);
                    });
            }else{
                const res = JSON.parse(sessionStorage.getItem("freeExam"));
                if(res){
                    setFreeExam(res._id);
                }
            }
        }
    }, []);

    return (
        <div className="container mx-auto min-h-without-footer items-center pt-[118px]">
            <Suspense fallback={null}>
                <LogoTopCenter />
            </Suspense>
            <div className="flex flex-row flex-wrap md:flex-nowrap px-48 max-md:px-12 items-center">
                <div className="basis-1/3 max-md:basis-1/2 mx-auto">
                    
                    {
                        freeExam && (
                            <a href={`${process.env.REACT_APP_FREE_EXAM_HOST}/before-start?examId=${freeExam}`}
                                className="btn-theme hover:bg-color-two relative btn btn-block border-0 my-8 text-xl text-white">Start Exam</a>)
                    }
                </div>
            </div>
        </div>
    )
}

export default LandingPage