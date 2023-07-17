import { useEffect, useState, lazy, Suspense } from "react";
const PhoneIcon = lazy(() => import("../components/common/svg/Phone"));
const LocationIcon = lazy(() => import("../components/common/svg/Location"));
const Footer = () => {
  const [homeUrl, setHomeUrl] = useState("/");
  useEffect(() => {
    if (localStorage.getItem("STDNTTKN")) {
      setHomeUrl("/home");
    }
  }, []);
  return (
    <div className="bg-gradient-to-b from-footer-bg-top to-footer-bg-bottom">
      <div className="container mx-auto text-white min-h-[330px] px-[18rem] md:px-1 py-8">
        <div className="basis-1 px-2">
          <a href={homeUrl} className="block w-[200px]"><img src='/images/logo.png' alt="SiteLogo" /></a>
        </div>
        <div className="text-title-1 font-bold text-xl text-center -mt-4 md:mt-2">আমাদের অফলাইন শাখাসমূহ</div>
        <div className="flex flex-row md:flex-col items-center md:items-start px-[6rem] md:px-2">
          <div className="basis-1/2 md:basis-1 py-3">
            <div className="text-title-2 font-[500]">Farmgate Branch</div>
            <Suspense fallback={null}>
              <PhoneIcon />
            </Suspense> 01324-723301 <br/>
            <Suspense fallback={null}>
              <LocationIcon />
            </Suspense> 78 Green Road, Farmgate, Dhaka-1215
          </div>
          <div className="basis-1/2 md:basis-1 py-3">
            <div className="text-title-2 font-[500]">Shantinagar Branch</div>
            <Suspense fallback={null}>
              <PhoneIcon />
            </Suspense> 01324-723303 <br/>
            <Suspense fallback={null}>
              <LocationIcon />
            </Suspense> 1 No Siddeshori Lane, Shantinagar, Dhaka
          </div>
        </div>
        <div className="flex flex-row md:flex-col items-center md:items-start px-[6rem] md:px-2">
          <div className="basis-1/2 md:basis-1 py-3">
            <div className="text-title-2 font-[500]">Uttara Branch</div>

            <Suspense fallback={null}>
              <PhoneIcon />
            </Suspense> 01324-723302 <br/>
            <Suspense fallback={null}>
              <LocationIcon />
            </Suspense> H # 8, R # 3, S # 6, Uttara, Dhaka
          </div>
          <div className="basis-1/2 md:basis-1 py-3">
            <div className="text-title-2 font-[500]">Rangpur Branch</div>

            <Suspense fallback={null}>
              <PhoneIcon />
            </Suspense> 01324-723305 <br/>
            <Suspense fallback={null}>
              <LocationIcon />
            </Suspense> Bangladesh Bank Mor, Rangpur
          </div>
        </div>
        <div className="flex pt-4 px-2">
          <div className="grow shrink text-center">
            Copyright © 2023 <span className="text-title-1 font-bold">Bondi</span> <span className="text-title-2 font-bold">Pathshala</span> All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
