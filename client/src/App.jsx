import NavBar from './components/NavBar'
import './App.css'
import Teams from './pages/Teams'
import Sports from './pages/Sports'
import Home from './pages/Home'
import WhoWeAre from './pages/WhoWeAre'
import MyProfile from './pages/MyProfile'
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path= "/" element={<Home/>} />
          <Route path= "/sports" element={<Sports/>} />
          <Route path= "/whoweare" element={<WhoWeAre/>} />
          <Route path= "/teams" element={<Teams/>} />
          <Route path= "/myprofile" element={<MyProfile/>} />
        </Routes>
      </div>
    </>
  );
}

export default App
