import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { NavLink } from "react-router-dom";

function AdvertiseBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const courseId = localStorage.getItem("FORCOURSE");

    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "api/advertise/getonead?courseId=" + courseId
        );

        // ✅ Only set ad if it has content
        if (res.data && (res.data.iLink || res.data.forwardingLink)) {
          setAd(res.data);
        } else {
          setAd(null); // nothing useful → disable component
        }
      } catch (err) {
        setError("Failed to load advertisements");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (isLoading) return null; // don't render loader if you want it "unworking"
  if (error || !ad) return null; // hide completely when error or no ad

  return (
    <div className="flex justify-center items-center py-2">
      <div
        className="rounded-2xl shadow-lg overflow-hidden 
                   w-full max-w-lg sm:max-w-xl md:max-w-2xl
                   transform transition duration-500 hover:scale-105 animate-fadeIn"
      >
        {/* Image + Link */}
        <div>
          <NavLink
            to={
              ad?.forwardingLink?.startsWith("http")
                ? ad.forwardingLink
                : `https://${ad.forwardingLink}`
            }
            target="_blank"
          >
            <img
              src={`${process.env.REACT_APP_API_HOST}/${ad?.iLink}`}
              alt="Advertisement"
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
            />
          </NavLink>

          {/* Visit Button */}
          <div className="p-4 flex justify-center">
            <NavLink
              to={
                ad?.forwardingLink?.startsWith("http")
                  ? ad.forwardingLink
                  : `https://${ad.forwardingLink}`
              }
              target="_blank"
              className="btn-theme px-6 py-2 rounded-lg text-white text-lg font-semibold shadow-md hover:shadow-xl transition"
            >
              বিস্তারিত দেখতে ক্লিক কর
            </NavLink>
          </div>
        </div>
      </div>

      {/* Tailwind keyframe for fade-in */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default AdvertiseBanner;
