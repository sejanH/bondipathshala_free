import { NavLink } from "react-router-dom";
import home from "../assets/img/icons/home2.svg";
import history from "../assets/img/icons/documenttext.svg";
import missed from "../assets/img/icons/edit2.svg";
import logout from "../assets/img/logout.svg";


const Header = () => {
  const toggleMobileMenu = () => {
    document.activeElement?.blur();
  };
  return (
    <div className="headerShadow px-28 md:px-4 z-50" id="main-nav">
      <div className="container mx-auto ">
        <div className="navbar bg-base-100 px-0">
          <div className="navbar-start w-[25%] md:w-full">
            <a className="px-0" href="/home">
              {" "}
              <img src="/images/logo.png" alt="SiteLogo" className="h-16 w-full md:h-full"/>
            </a>
          </div>
          <div className="navbar-end w-[75%] flex lg:hidden">
            <div className="dropdown dropdown-left">
              <label tabIndex={0} className="lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact menu-vertical dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48 text-white menu-dropdown-toggle"
              >
                <li className="" onClick={toggleMobileMenu}>
                  <NavLink to="/home" className="btn-theme" onClick={toggleMobileMenu}>
                    <div className="">
                      <img src={home} alt="menuIcon" />
                    </div>
                    Home
                  </NavLink>
                </li>
                <li className="" onClick={toggleMobileMenu}>
                  <NavLink to="/history" className="btn-theme" onClick={toggleMobileMenu}>
                    <div className="">
                      <img src={history} alt="menuIcon" />
                    </div>
                    History
                  </NavLink>
                </li>
                <li className="" onClick={toggleMobileMenu}>
                  <NavLink to="/missed-exams" className="btn-theme" onClick={toggleMobileMenu}>
                    <div className="">
                      <img src={missed} alt="menuIcon" />
                    </div>
                    Missed Exam
                  </NavLink>
                </li>
                <li className="">
                  <a href="/login" className="btn-theme">
                    Logout
                    <div className="">
                      <img src={logout} alt="menuIcon" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-end w-[75%] hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white font-bold text-sm">
              <li className="m-2 text-center w-[10rem] h-12">
                <NavLink to="/home" className="relative btn-theme btn-block navBtn">
                  <div className="flex justify-center items-center w-full space-x-2">
                    <img src={home} alt="menuIcon" className="iconImg" />
                    <span className="btnLabel">Home</span>
                  </div>
                  <span className="circle"></span>
                </NavLink>
              </li>
              <li className="m-2 text-center w-[10rem] h-12">
                <NavLink
                  to="/history"
                  className="relative btn-theme  btn-block navBtn"
                >
                  <div className="flex justify-center items-center w-full space-x-2">
                    <img src={history} alt="menuIcon" className="iconImg" />
                    <span className="btnLabel">History</span>
                  </div>
                  <span className="circle"></span>
                </NavLink>
              </li>
              <li className="m-2 text-center w-[10rem] h-12">
                <NavLink
                  to="/missed-exams"
                  className="relative btn-theme  btn-block navBtn"
                >
                  <div className="flex justify-center items-center w-full space-x-2">
                    <img src={missed} alt="menuIcon" className="iconImg" />
                    <span className="btnLabel">Missed Exam</span>
                  </div>
                  <span className="circle"></span>
                </NavLink>
              </li>

              <li className="m-2 text-center w-[10rem] h-12">
                <a
                  href="/login"
                  className="relative btn-theme  btn-block navBtn"
                >
                  <div className="flex justify-center items-center w-full space-x-2">
                    <span className="btnLabel">Logout</span>
                    <img src={logout} alt="menuIcon" className="iconImg" />
                  </div>
                  <span className="circle"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
