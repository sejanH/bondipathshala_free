import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../utils/axios";

function AdvertiseBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [ad, setAd] = useState("");
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "api/advertise/getonead?courseId=64bae331e0764693a97bfef2"
        );
        setAd(res.data);
        setIsOpen(true); // open modal automatically

        // Auto-close after 5 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 5000);
      } catch (err) {
        setError("Failed to load advertisements");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAds();
  }, []);

  if (isLoading)
    return <p className="text-center py-10">Loading advertisements...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden 
                       w-full max-w-lg sm:max-w-xl md:max-w-2xl animate-fadeIn"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 bg-red-500 text-white 
             rounded-full w-8 h-8 flex items-center justify-center 
             text-2xl font-bold shadow-md hover:bg-red-600 
             transition duration-300 z-50"
              aria-label="Close"
            >
              ×
            </button>

            {/* Image + Link */}
            <div>
              <NavLink
                to={
                  ad?.forwardingLink?.startsWith("http")
                    ? ad?.forwardingLink
                    : `https://${ad?.forwardingLink}`
                }
                target="_blank"
              >
                <img
                  src={`${process.env.REACT_APP_API_HOST}/${ad?.iLink}`}
                  alt="Advertisement"
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </NavLink>
            </div>

            {/* Visit Button */}
            <div className="p-4 flex justify-center">
              <NavLink
                to={
                  ad?.forwardingLink?.startsWith("http")
                    ? ad?.forwardingLink
                    : `https://${ad?.forwardingLink}`
                }
                target="_blank"
                className="btn-theme px-6 py-2 rounded-lg text-white text-lg font-semibold shadow-md hover:shadow-xl transition"
              >
                Visit
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind keyframe for fade-in */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>
    </>
  );
}

export default AdvertiseBanner;
