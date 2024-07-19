import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamesPage from './components/GamePage/GamePage';
import Layout from './components/Layout/Layout';
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import './App.css'


const games = [
  { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },

  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  // { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  // { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },

];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GamesPage games={games} />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="search-exams" element={<Search />} /> */}
          {/* <Route path="results" element={<Results />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App