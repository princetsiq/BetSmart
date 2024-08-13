import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import NavBar from '../NavBar/NavBar';
import LandingBar from '../NavBar/LandingBar';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className='layout'>
      {isAuthenticated ? <NavBar /> : <LandingBar />}
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;