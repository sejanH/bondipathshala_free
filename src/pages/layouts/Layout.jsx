import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from "react-router-dom";

const Layout = () => {
  
  useEffect(() => {
    
    let navbar = document.getElementById("main-nav");

    let navPos = 180;

    window.addEventListener("scroll", e => {
      let scrollPos = window.scrollY;
      if (scrollPos > navPos) {
        navbar.classList.add('sticky','bg-white','top-0');
      } else {
        navbar.classList.remove('sticky','bg-white','top-0');
      }
    });
  },[]);
    return (
        <React.Fragment>
            <Header />
            <div className="min-h-body bg-[#eeeeee]">
                <Outlet />
            </div>
            <Footer />
        </React.Fragment>
    );
};
export default Layout;