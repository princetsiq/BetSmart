import React from "react";
import "./UserTeams.css";
import TeamCard from "../TeamCard/TeamCard";

const UserTeams = ({
  cardsPerRow = 3,
  sortedTeams = [],
  followedTeams = {},
}) => {
  return (
    <div className="user-team">
      <div className="team-header">
        <h3>Followed Teams</h3>
      </div>
      <div className="teams">
        <div
          className="teams-grid"
          style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}
        >
          {sortedTeams.map((team, index) => (
            <TeamCard
              key={team.id || index}
              img={team.img}
              title={team.title}
              link={team.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTeams;
