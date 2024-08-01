import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Games from './pages/Games/Games';
import Layout from './components/Layout/Layout';
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import WhoWeAre from './pages/WhoWeAre/WhoWeAre';
import Home from './pages/Home/Home';
import MyProfile from './pages/MyProfile/MyProfile';
import Teams from './pages/Teams/Teams';
import { AuthProvider } from './components/Authentication/AuthContext';


import gsw from "./assets/teams/gsw.png";
import lal from "./assets/teams/lal.png";
import nyk from "./assets/teams/nyk.png";
import okc from "./assets/teams/okc.png";
import ptb from "./assets/teams/ptb.png";

// const games = [
//   { team1: 'Golden State Warriors', team1Logo: gsw, team2: 'Los Angeles Lakers', team2Logo: lal, date: '2024-07-20' },
//   { team1: 'New York Knicks', team1Logo: nyk, team2: 'Oklahoma City Thunder', team2Logo: okc, date: '2024-07-21' },
//   { team1: 'Portland Trail Blazers', team1Logo: ptb, team2: 'Golden State Warriors', team2Logo: gsw, date: '2024-07-19' },
//   { team1: 'Los Angeles Lakers', team1Logo: lal, team2: 'New York Knicks', team2Logo: nyk, date: '2024-07-22' },
//   { team1: 'Oklahoma City Thunder', team1Logo: okc, team2: 'Portland Trail Blazers', team2Logo: ptb, date: '2024-07-23' },
//   { team1: 'Golden State Warriors', team1Logo: gsw, team2: 'Los Angeles Lakers', team2Logo: lal, date: '2024-07-18' },
//   { team1: 'New York Knicks', team1Logo: nyk, team2: 'Golden State Warriors', team2Logo: gsw, date: '2024-07-24' },
//   { team1: 'Portland Trail Blazers', team1Logo: ptb, team2: 'New York Knicks', team2Logo: nyk, date: '2024-07-25' },
//   { team1: 'Los Angeles Lakers', team1Logo: lal, team2: 'Oklahoma City Thunder', team2Logo: okc, date: '2024-07-26' },
//   { team1: 'Oklahoma City Thunder', team1Logo: okc, team2: 'Golden State Warriors', team2Logo: gsw, date: '2024-07-27' },
//   { team1: 'New York Knicks', team1Logo: nyk, team2: 'Los Angeles Lakers', team2Logo: lal, date: '2024-07-28' },
//   { team1: 'Golden State Warriors', team1Logo: gsw, team2: 'Portland Trail Blazers', team2Logo: ptb, date: '2024-07-29' },
// ];

// const placeholderDesc =
//     "This is the card description. Your details will go here!";

// const pLink =
//   "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.si.com%2Ffannation%2Fnba%2Ffastbreak%2Fex-miami-heat-star-victor-oladipo-reacts-to-tyler-herro-instagram-post&psig=AOvVaw1wcDI36aN3N39DwZ1qEn3v&ust=1721510356964000&source=images&cd=vfe&opi=89978449&ved=0CBUQjhxqFwoTCOiIlPCDtIcDFQAAAAAdAAAAABAJ";

const teamsData = [
  {
    id: 1,
    img: gsw,
    title: "Golden State Warriors",
    // description: placeholderDesc,
    // link: pLink,
  },
  // {
  //   id: 5,
  //   img: ptb, 
  //   title: "Portland Trail Blaizers",
  //   description: placeholderDesc,
  //   link: pLink,
  // },
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
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home teams={teamsData} />} />
            <Route path="games" element={<Games />} />
            <Route path="teams" element={<Teams />} />
            <Route path="who-we-are" element={<WhoWeAre />} />
            <Route path="my-profile" element={<MyProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;