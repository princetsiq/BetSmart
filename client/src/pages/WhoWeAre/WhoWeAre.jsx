import React from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./WhoWeAre.css";
import Jaden from "../../assets/ProfilePics/Jaden.jpeg";

const WhoWeAre = () => {
  const jadenDescription =
    "Hello, my name is Jaden Ritchie, I’m a rising junior studying computer science and minoring in game engineering at NYU Tandon School of Engineering. I’m interested in a career in software engineering but wouldn’t mind branching out to different fields";
  return (
    <>
      <div className="about-us"></div>
      <h1>Who We Are</h1>
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
