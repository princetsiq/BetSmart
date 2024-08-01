import React, { useState } from "react";
import "./ProfileCard.css";

const ProfileCard = (props) => {
  return (
    <>
      <div className="Card">
        <div className="upper-container">
          <div className="image-container">
            <img src={props.image} alt="" height="100px" width="100px"></img>
          </div>
        </div>
        <div className="lower-container">
          <h3> {props.name}</h3>
          <h4> {props.title}</h4>
          <p> {props.about}</p>
          <a
            href={props.Llink}
            target="_blank"
            rel="noopener noreferrer"
            className="button-link"
          >
            <img src={props.Lsocial} alt="Linkeldn"></img>
          </a>
          <a
            href={props.Glink}
            target="_blank"
            rel="noopener noreferrer"
            className="button-link"
          >
            <img src={props.Gsocial} alt="Github"></img>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
