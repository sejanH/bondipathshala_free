import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "../utils/axios";
import ExamCardTwo from "../components/ExamCardTwo";
import CountDownExam from "../components/home/CountDownExam";
import NoExams from "../components/home/NoExams";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import AdvertiseBanner from "../components/Advertise/AdvertiseBanner";

const LogoTopCenter = lazy(() => import("../components/LogoTopCenter"));

const LandingPage = () => {
  const [freeExam, setFreeExam] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    sessionStorage.removeItem("FREESTDNTTKN");
    sessionStorage.removeItem("FREESTDNTID");
    sessionStorage.removeItem("FREEEXAMID");
    const assigned = [];
    localStorage.setItem("assigned", JSON.stringify(assigned));

    axios
      .get("/api/freestudent/getliveexam")
      .then((res) => {
        setFreeExam(res.data.live || []);
        setUpcoming(res.data.upcoming || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error fetching exams:", err);
      });
  }, []);
  return (
    <>
      <AdvertiseBanner />
      {isLoading ? (
        <>
          <div className="flex items-center justify-center h-40">
            <div className="flex space-x-2 text-xl text-gray-600 font-semibold">
              <span className="animate-bounce [animation-delay:0ms]">L</span>
              <span className="animate-bounce [animation-delay:100ms]">o</span>
              <span className="animate-bounce [animation-delay:200ms]">a</span>
              <span className="animate-bounce [animation-delay:300ms]">d</span>
              <span className="animate-bounce [animation-delay:400ms]">i</span>
              <span className="animate-bounce [animation-delay:500ms]">n</span>
              <span className="animate-bounce [animation-delay:600ms]">g</span>
              <span className="animate-bounce [animation-delay:700ms]">.</span>
              <span className="animate-bounce [animation-delay:800ms]">.</span>
              <span className="animate-bounce [animation-delay:900ms]">.</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto min-h-without-footer items-center pb-[60px]">
            <div className="grid grid-cols-12 md:block gap-4">
              {/* Live Exams */}
              <div className="col-span-6 bg-white rounded-lg py-5">
                <h2 className="text-4xl uppercase indent-1 text-title-2 font-semibold text-center mb-3">
                  Today's Live Exam
                </h2>
                {freeExam.length === 0 ? (
                  <div className="bg-white px-6 pt-6 pb-4 rounded-lg mb-4">
                    <NoExams message="No live exams at the moment" />
                    {/* <Skeleton height={50} /> */}
                  </div>
                ) : (
                  <div className="grid gap-4 grid-cols-2">
                    {freeExam.map((data, index) => (
                      <div
                        className="col-span-2 rounded-lg px-5 py-0"
                        key={index}
                      >
                        <ExamCardTwo exam={data} freeExam={true} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upcoming Exams */}
              <div className="col-span-6 bg-white rounded-xl py-6">
                <h2 className="text-4xl uppercase indent-1 text-title-2 font-semibold text-center mb-3">
                  Upcoming Exam
                </h2>
                {upcoming.length === 0 ? (
                  <div className="bg-white px-6 pt-6 pb-4 rounded-lg mb-4">
                    <NoExams message="No upcoming exams at the moment" />
                    {/* <Skeleton height={50} /> */}
                  </div>
                ) : (
                  <div className="grid gap-4 grid-cols-2">
                    {upcoming.map((data, index) => (
                      <div
                        className="col-span-2 rounded-lg px-5 py-0"
                        key={index}
                      >
                        <CountDownExam
                          id={data._id}
                          title={data.name}
                          img={data.iLink}
                          date={moment
                            .utc(data.startTime)
                            .subtract(6, "h")
                            .toDate()}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LandingPage;
