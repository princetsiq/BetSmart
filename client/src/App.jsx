import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamesPage from './pages/Games/Game';
import Layout from './components/Layout/Layout';
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import WhoWeAre from './pages/WhoWeAre/WhoWeAre';
import Teams from './pages/Teams/Teams';
import Home from './pages/Home/Home';
import MyProfile from './pages/MyProfile/MyProfile';
import Followed from './pages/Followed/Followed';
import heat from "./assets/image.png";
import './App.css';

const games = [
  { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },
  { team1: 'Team C', team2: 'Team D', date: '2024-07-21' },
  { team1: 'Team A', team2: 'Team B', date: '2024-07-20' },

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

const placeholderDesc =
    "This is the card description. Your details will go here!";
const pLink =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.si.com%2Ffannation%2Fnba%2Ffastbreak%2Fex-miami-heat-star-victor-oladipo-reacts-to-tyler-herro-instagram-post&psig=AOvVaw1wcDI36aN3N39DwZ1qEn3v&ust=1721510356964000&source=images&cd=vfe&opi=89978449&ved=0CBUQjhxqFwoTCOiIlPCDtIcDFQAAAAAdAAAAABAJ";
const miamiHeatData = Array.from({ length: 10 }, () => ({
  img: heat,
  title: "Miami Heat",
  description: placeholderDesc,
  link: pLink,
}));



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="games" element={<GamesPage games={games} />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path= "/who-we-are" element={<WhoWeAre/>} />
          {/* <Route path= "/teams" element={<Teams/>} /> */}
          <Route path= "/my-profile" element={<MyProfile/>} />
          <Route path= "/teams" element={<Followed teams={miamiHeatData}/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App