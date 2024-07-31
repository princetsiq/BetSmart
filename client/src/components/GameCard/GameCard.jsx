import React from 'react';
import './GameCard.scss';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="team team-left">
        <img src={game.HOME_TEAM_LOGO_PATH} alt={`${game.HOME_TEAM_ABBREVIATION} logo`} className="team-logo" />
        {/* <span className="team-name">{game.HOME_TEAM_ABBREVIATION}</span> */}
      </div>
      <div className="game-details">
        {/* <span className="vs">{game.HOME_TEAM_ABBREVIATION} vs {game.AWAY_TEAM_ABBREVIATION}</span> */}
        <span className="vs">vs</span>
        <p className="game-date">{game.GAME_DATE}</p>
        {/* <p className="game-date">{game.GAME_ID}</p> */}
      </div>
      <div className="team team-right">
        {/* <span className="team-name">{game.AWAY_TEAM_ABBREVIATION}</span> */}
        <img src={game.AWAY_TEAM_LOGO_PATH} alt={`${game.AWAY_TEAM_ABBREVIATION} logo`} className="team-logo" />
      </div>
    </div>
  );
};

export default GameCard;