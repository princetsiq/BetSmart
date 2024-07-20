import React from "react";
import "./TeamCard.css";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

function TeamCard(props) {
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
        {props.title && <h2 className="team-card-title">{props.title}</h2>}
        {props.description && (
          <p className="team-card-description">{props.description}</p>
        )}
      </div>
      {props.link && (
        <AnimatedButton link={props.link}>View Team</AnimatedButton>
      )}
    </div>
  );
}

export default TeamCard;
