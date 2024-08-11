import React, { useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./WhoWeAre.css";
import Jaden from "../../assets/ProfilePics/Jaden.jpeg";
import Prince from "../../assets/ProfilePics/prince.jpg";
import Marc from "../../assets/ProfilePics/marc.jpg";
import AnimateLetters from "../../components/AnimateLetters/AnimateLetters";
import Github from "../../assets/Socials/github.png";
import Linkedin from "../../assets/Socials/linkedin-logo.svg";

const WhoWeAre = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [view, setView] = useState("default");

  const handleSort = () => {
    // Implement sorting logic here
  };

  const jadenDescription =
    "Hello, my name is Jaden Ritchie, I’m a rising junior studying computer science and minoring in game engineering at NYU Tandon School of Engineering. I’m interested in a career in software engineering but wouldn’t mind branching out to different fields";

  const princeDesc =
    "Hello! I'm a junior at NYU's Tandon School of Engineering, majoring in Computer Science. My passion lies in backend development for web services. I'm actively seeking summer internships to gain hands-on experience and contribute to innovative projects.";

  const marcDesc =
    "Hi! My name is MarcAnthony (he/him), and I am a junior Computer Engineering major at NYU Tandon. I am a lifelong learner with a strong passion for data science, robotics, social justice, computer programming, and giving back to my community.";
  return (
    <>
      <div className="who-are-we">
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
        <div className="about-us">
          <ProfileCard
            image={Jaden}
            title="Computer Science"
            name="Jaden Ritchie"
            about={jadenDescription}
            Llink="https://www.linkedin.com/in/jadenritchie/"
            Lsocial={Linkedin}
            Glink="https://github.com/jadenar07"
            Gsocial={Github}
          ></ProfileCard>
          <ProfileCard
            image={Prince}
            title="Computer Science"
            name="Prince"
            about={princeDesc}
            Llink="https://www.linkedin.com/in/prince-tsiquaye/"
            Lsocial={Linkedin}
            Glink="https://github.com/princetsiq"
            Gsocial={Github}
          ></ProfileCard>
          <ProfileCard
            image={Marc}
            title="Computer Engineering"
            name="MarcAnthony Williams"
            about={marcDesc}
            Glink="https://github.com/MarcAnthonyWilliams"
            Lsocial={Linkedin}
            Llink="https://www.linkedin.com/in/marcanthony-williams-896798252/"
            Gsocial={Github}
          ></ProfileCard>
        </div>
      </div>
    </>
  );
};

export default WhoWeAre;