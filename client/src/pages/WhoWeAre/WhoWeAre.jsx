import React, { useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./WhoWeAre.css";
import Jaden from "../../assets/ProfilePics/Jaden.jpeg";
import AnimateLetters from "../../components/AnimateLetters/AnimateLetters";

const WhoWeAre = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [view, setView] = useState("default");

  const handleSort = () => {
    // Implement sorting logic here
  };

  const jadenDescription =
    "Hello, my name is Jaden Ritchie, I’m a rising junior studying computer science and minoring in game engineering at NYU Tandon School of Engineering. I’m interested in a career in software engineering but wouldn’t mind branching out to different fields";

  return (
    <>
      <div className="game-header">
        <div className="header-title">
          <br />
          <br />
          <AnimateLetters
            letterClass={letterClass}
            strArray={"Who We Are".split("")}
            idx={1}
          />
        </div>
      </div>
      <div className="about-us"></div>
      <ProfileCard
        image={Jaden}
        title="Computer Science"
        name="Jaden Ritchie"
        about={jadenDescription}
        link="https://www.linkedin.com/in/jadenritchie/"
      ></ProfileCard>
    </>
  );
};

export default WhoWeAre;
