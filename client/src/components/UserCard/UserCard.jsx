import React from "react";
import "./UserCard.css";

const UserCard = (props) => {
  return (
    <>
      <div className="user-card">
        <div className="user-card-img">
          <img src={props.image} alt="" height="100px" width="100px"></img>
        </div>
        <h3 title="username">{props.username}</h3>
      </div>
    </>
  );
};

export default UserCard;
