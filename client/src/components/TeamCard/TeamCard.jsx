import React from "react";
import "./TeamCard.scss";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const TeamCard = (props) => {
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
      {props.link && (
        <AnimatedButton link={props.link}>View Team</AnimatedButton>
      )}
    </div>
  );
};

export default TeamCard;