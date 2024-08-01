import React from "react";
import "./GameCard.scss";
import PredictionComponent from "../PredictionComponent/PredictionComponent";

const GameCard = ({ game }) => {
  return (
    <div className="game-card-wrap">
      <div className="game-card">
        <div className="team team-left">
          <img
            src={game.homeTeamLogo}
            alt={`${game.homeTeamName} logo`}
            className="team-logo"
          />
          <span className="team-name">{game.homeTeamName}</span>
        </div>
        <div className="game-details">
          <span className="vs">vs</span>
          <p className="game-date">{game.gameDate}</p>
        </div>
        <div className="team team-right">
          <span className="team-name">{game.awayTeamName}</span>
          <img
            src={game.awayTeamLogo}
            alt={`${game.homeTeamName} logo`}
            className="team-logo"
          />
        </div>
      </div>
      <PredictionComponent></PredictionComponent>
    </div>
  );
};

export default GameCard;
