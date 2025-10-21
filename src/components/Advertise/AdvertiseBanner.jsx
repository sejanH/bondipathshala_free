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
          "api/advertise/getonead?courseId=64bada5358781d50e8ecaafd" //server
          // "api/advertise/getonead?courseId=68e643b1dd09b81da3dbfbe1" //local
        );

        if (res.data && (res.data.iLink || res.data.forwardingLink)) {
          setAd(res.data);
        } else {
          setAd(null);
        }
      } catch (err) {
        setError("Failed to load advertisements");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (isLoading) return null;
  if (error || !ad) return null;

  return (
    <div className="w-full">
      {/* Cover image */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
        <img
          src={`${process.env.REACT_APP_API_HOST}/${ad?.iLink}`}
          alt="Advertisement"
          className="w-full h-full object-cover"
        />

        {/* Button overlay (bottom-right) */}
        <div className="absolute bottom-3 right-4">
          <NavLink
            to={
              ad?.forwardingLink?.startsWith("http")
                ? ad.forwardingLink
                : `https://${ad.forwardingLink}`
            }
            target="_blank"
            className="btn-theme text-white py-1 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2 md:text-base rounded-lg font-semibold shadow-md transition"
          >
            বিস্তারিত দেখুন
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AdvertiseBanner;
