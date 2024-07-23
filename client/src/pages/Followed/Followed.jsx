
import React, { useState, useEffect } from "react";
import TeamCard from "../../components/TeamCard/TeamCard";
import "./Followed.scss";
// import AnimatedButton from "../AnimatedButton/AnimatedButton";
import AnimateLetters from "../../components/AnimateLetters/AnimateLetters";

const Followed = ({ teams = [] }) => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [cardsPerRow, setCardsPerRow] = useState(
    getCardsPerRow(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setCardsPerRow(getCardsPerRow(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    const timerId = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardsData = teams.map((team, index) => ({
    img: team.img || heat,
    title: team.title || "Team Name",
    description: team.description || placeholderDesc,
    link: team.link || pLink,
  }));

  return (
    <>
      <div className="followed-page">
        <div className="header">
          <div className="header-title">
            <br />
            <br />
            <AnimateLetters
              letterClass={letterClass}
              strArray={"Followed Teams".split("")}
              idx={1}
            />
          </div>
          <div className="header-options">
            <button className="default">
              <p className="text">Default</p>
            </button>
            <button className="a-z">
              <p className="text">A-Z</p>
            </button>
            <button className="list-view">
              <p className="text">List View</p>
            </button>
          </div>
        </div>
        <hr className="page-break" />
        <div
          className="followed-page-container"
          style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}
        >
          {cardsData.map((card, index) => (
            <TeamCard
              key={index}
              img={card.img}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const getCardsPerRow = (width) => {
  if (width > 900) return 4;
  if (width > 600) return 2;
  return 1;
};

export default Followed;