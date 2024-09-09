import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchAuthSession } from 'aws-amplify/auth';
import TeamCard from "../TeamCard/TeamCard";
import Loading from '../../components/Loading/Loading';
import "./UserTeams.css";

const UserTeams = () => {
  const [teams, setTeams] = useState([]);
  const [followedTeams, setFollowedTeams] = useState({});
  const [teamIds, setTeamIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowedTeams = async () => {
      try {
        const session = await fetchAuthSession();
        const userEmail = session.tokens.idToken.payload.email;

        const response = await axios.get('http://localhost:5002/api/followed-teams', {
          params: { email: userEmail },
        });

        setTeamIds(response.data);

        if (response.data.length === 0) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching followed teams:', error);
        setLoading(false);
      }
    };
    
    fetchFollowedTeams();
  }, []);

  useEffect(() => {
    if (teamIds.length === 0) {
      return;
    }

    const fetchFollowedTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/my-teams', {
          params: { teamIds },
        });

        const myTeams = response.data.reduce((acc, team) => {
          acc[team.id] = team;
          return acc;
        }, {});

        setFollowedTeams(myTeams);
        setTeams(Object.values(myTeams));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching followed teams:', error);
        setLoading(false);
      }
    };

    fetchFollowedTeams();
  }, [teamIds]);

  const toggleFollow = async (teamId) => {
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;

      const updatedFollowedTeams = { ...followedTeams };

      delete updatedFollowedTeams[teamId];
      await axios.delete(`http://localhost:5002/api/user-teams/${teamId}`, { 
        data: { email: userEmail } 
      });

      setFollowedTeams(updatedFollowedTeams);
      setTeams(Object.values(updatedFollowedTeams));
    } catch (error) {
      console.error('Error processing follow/unfollow action:', error);
    }
  };

  const renderTeams = () => {
    if (teams.length === 0) {
      return (
        <div className="no-teams-message">
          No followed teams. Followed teams will appear here.
        </div>
      );
    }

    return (
      <div className="teams-scroll-container">
        <div className="teams-row">
          {teams.map((team, index) => (
            <TeamCard            
              key={index}
              id={team.id}
              img={team.logo_path}
              title={team.full_name}
              isFollowed={!!followedTeams[team.id]}
              onToggleFollow={() => toggleFollow(team.id)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="user-team">
      <div className="team-header">
        <h3>My Teams</h3>
      </div>
      {loading ? (
      <Loading />
      ) : (
        <div className="teams">
          {renderTeams()}
        </div>
      )}
    </div>
  );
};

export default UserTeams;