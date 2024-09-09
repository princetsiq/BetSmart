import React from 'react';
import UserCard from "../../components/UserCard/UserCard";
import UserTeams from "../../components/UserCard/UserTeams";
import UserPlayers from '../../components/UserCard/UserPlayers';
import "./MyProfile.scss";


const MyProfile = () => {
  return (
    <div className="center-container">
      <div className="wrap">
        <div className="user-wrap">
          <UserCard /> 
        </div>
        <div className="team-wrap">
          <UserTeams />
          <UserPlayers />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;