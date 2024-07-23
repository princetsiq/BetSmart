import React from 'react';
import './GameCard.scss';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="team team-left">
        <img src={game.team1Logo} alt={`${game.team1} logo`} className="team-logo" />
      </div>
      <div className="game-details">
        <span className="vs">{game.team1} vs {game.team2}</span>
        <p className="game-date">{game.date}</p>
      </div>
      <div className="team team-right">
        <img src={game.team2Logo} alt={`${game.team2} logo`} className="team-logo" />
      </div>
    </div>
  );
};

export default GameCard;