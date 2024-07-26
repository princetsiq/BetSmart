import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const Layout = () => {
  return (
    // <div className="app">
    //   <NavBar/>
    //   <div className="page">
    //     <Outlet />
    //   </div>
    // </div>

    <>
     <NavBar/>
     <Outlet />
    </>
  );
};

export default Layout;