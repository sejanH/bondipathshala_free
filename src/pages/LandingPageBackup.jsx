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

  useEffect(() => {
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
      })
      .catch((err) => {
        console.error("Error fetching exams:", err);
      });
  }, []);
  return (
    <>
      <AdvertiseBanner />
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
                  <div className="col-span-2 rounded-lg px-5 py-0" key={index}>
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
                  <div className="col-span-2 rounded-lg px-5 py-0" key={index}>
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
  );
};

export default LandingPage;
