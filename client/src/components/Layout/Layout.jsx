// import React, { useEffect, useState } from 'react';
// import { Outlet, Navigate, useNavigate } from 'react-router-dom';
// import { useAuth } from '../Authentication/AuthContext';
// import NavBar from '../NavBar/NavBar';
// import LandingBar from '../NavBar/LandingBar';

// const Layout = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <div className='layout'>
//       {(isAuthenticated && <NavBar />) || <LandingBar />}
//       <Outlet />
//     </div>
//   );
// };

// export default Layout;