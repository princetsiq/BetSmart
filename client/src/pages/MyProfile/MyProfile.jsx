import React from "react";
import "./MyProfile.scss";
import UserCard from "../../components/UserCard/UserCard";
import UserTeams from "../../components/UserCard/UserTeams";

const MyProfile = () => {
  return (
    <div className="center-container">
      <div className="wrap">
        <div className="user-wrap">
          <UserCard />
        </div>
        <div className="team-wrap">
          <UserTeams />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
