import React from "react";
import { useNavigate } from "react-router-dom";
import "./TeamCard.scss";

const TeamCard = (props) => {
  const navigate = useNavigate();

  const handleViewTeamClick = () => {
    navigate(`/players?teamId=${props.id}&teamName=${encodeURIComponent(props.title)}`);
  };

  return (
    <div className="team-card-container">
      <div className="team-card-body">
        {props.img && (
          <img
            src={props.img}
            alt={props.alt || "Team image"}
            className="team-card-img"
          />
        )}
        {props.title && (
          <div className="team-card-header">
            <h2 className="team-card-title">
              {props.title}
            </h2>
            <button
              className={`follow-button ${props.isFollowed ? 'followed' : ''}`}
              onClick={props.onToggleFollow}
            >
              ★
            </button>
          </div>
        )}
        {props.description && (
          <p className="team-card-description">{props.description}</p>
        )}
      </div>
      {props.id && (
        <button className="view-team" onClick={handleViewTeamClick}>
          View Team
        </button>
      )}
    </div>
  );
};

export default TeamCard;