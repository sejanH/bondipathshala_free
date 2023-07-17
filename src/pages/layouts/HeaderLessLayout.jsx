import React from 'react';
import Footer from '../../components/Footer';
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <React.Fragment>
            <div className=' bg-[#eeeeee]'>
            <Outlet />

            </div>
            <Footer />
        </React.Fragment>
    );
};
export default Layout;