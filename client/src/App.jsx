import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Games from './pages/Games/Games';
import Layout from './components/Layout/Layout';
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import WhoWeAre from './pages/WhoWeAre/WhoWeAre';
import Home from './pages/Home/Home';
import MyProfile from './pages/MyProfile/MyProfile';
import Teams from './pages/Teams/Teams';
import Players from './pages/Players/Players';
import { useAuth } from './components/Authentication/AuthContext';
import AuthService from './components/Authentication/AuthService';

import gsw from "./assets/teams/gsw.png";
import lal from "./assets/teams/lal.png";
import nyk from "./assets/teams/nyk.png";
import okc from "./assets/teams/okc.png";
import ptb from "./assets/teams/ptb.png";

const teamsData = [
  {
    id: 1,
    img: gsw,
    title: "Golden State Warriors",
    // description: placeholderDesc,
    // link: pLink,
  },
  {
    id: 5,
    img: ptb, 
    title: "Portland Trail Blaizers",
    // description: placeholderDesc,
    // link: pLink,
  },
  {
    id: 3,
    img: nyk, 
    title: "New York Knicks",
    // description: placeholderDesc,
    // link: pLink,
  },
  {
    id: 2,
    img: lal, 
    title: "Los Angeles Lakers",
    // description: placeholderDesc,
    // link: pLink,
  },
  {
    id: 4,
    img: okc, 
    title: "Oklahoma City Thunder",
    // description: placeholderDesc,
    // link: pLink,
  },
];

function App() {
  // const { isAuthenticated, setIsAuthenticated } = useAuth();

  // useEffect(() => {
  //   async function checkUserSession() {
  //     const user = await AuthService.getCurrentAuthenticatedUser();
  //     if (user) {
  //       const session = await AuthService.getUserSession();
  //       if (session) {
  //         setIsAuthenticated(true);
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   }

  //   checkUserSession();
  // }, []);

  // useEffect(() => {
  //   async function checkUserSession() {
  //     if (isAuthenticated) {
  //       try {
  //         const session = await AuthService.getUserSession();
  //         if (session) {
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(false);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching user session', error);
  //         setIsAuthenticated(false);
  //       }
  //     }
  //   }

  //   checkUserSession();
  // }, [isAuthenticated, setIsAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path='sign-up' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Home teams={teamsData} />} />
          {/* <Route index element={isAuthenticated ? <Home teams={teamsData} /> : <Navigate to='login' />} /> */}
          <Route path='games' element={<Games />} />
          <Route path='teams' element={<Teams />} />
          <Route path='players' element={<Players />} />
          <Route path='who-we-are' element={<WhoWeAre />} />
          <Route path='my-profile' element={<MyProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;