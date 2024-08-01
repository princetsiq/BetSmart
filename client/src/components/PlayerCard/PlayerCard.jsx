import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './PlayerCard.scss'; 

const PlayerCard = (props) => {
  const [showStats, setShowStats] = useState(false);

  const toggleStats = () => {
    setShowStats(!showStats);
  };

  return (
    <div className="player-card-container">
      <div className="player-card-body">
        {props.img && (
          <img
            src={props.img}
            alt={props.alt || "Player image"}
            className="player-card-img"
          />
        )}
        {props.name && (
          <div className="player-card-header">
            <h2 className="player-card-title">
              {props.name}
            </h2>
            <button
              className={`player-follow-button ${props.isFollowed ? 'followed' : ''}`}
              onClick={props.onToggleFollow}
            >
              ★
            </button>
          </div>
        )}
        {/* {props.description && (
          <p className="player-card-description">{props.description}</p>
        )} */}
      </div>
      <button className="stats-button" onClick={toggleStats}>
        {showStats ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
      </button>
      {showStats && (
        <div className="stats-slider">
          <h3>Player Stats</h3>
          <p>Points: {props.stats.points}</p>
          <p>Assists: {props.stats.assists}</p>
          <p>Rebounds: {props.stats.rebounds}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;