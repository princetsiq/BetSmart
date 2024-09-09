import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchAuthSession } from 'aws-amplify/auth';
import PlayerCard from "../PlayerCard/PlayerCard";
import Loading from '../../components/Loading/Loading';
import "./UserPlayers.css";

const UserPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [followedPlayers, setFollowedPlayers] = useState({});
  const [playerIds, setPlayerIds] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowedPlayers = async () => {
      try {
        const session = await fetchAuthSession();
        const userEmail = session.tokens.idToken.payload.email;

        const response = await axios.get('http://localhost:5002/api/followed-players', {
          params: { email: userEmail },
        });

        setPlayerIds(response.data);

        if (response.data.length === 0) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching followed players:', error);
      }
    };
    
    fetchFollowedPlayers();
  }, []);

	useEffect(() => {
    if (playerIds.length === 0) {
      return;
    }

    const fetchFollowedPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/my-players', {
          params: { playerIds },
        });

        const myPlayers = response.data.reduce((acc, player) => {
          acc[player.id] = player;
          return acc;
        }, {});

        setFollowedPlayers(myPlayers);
        setPlayers(Object.values(myPlayers));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching followed players:', error);
        setLoading(false);
      }
    };

    fetchFollowedPlayers();
  }, [playerIds]);

  const toggleFollow = async (playerId) => {
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;

      const updatedFollowedPlayers = { ...followedPlayers };

      delete updatedFollowedPlayers[playerId];
      await axios.delete(`http://localhost:5002/api/user-players/${playerId}`, {
        data: { email: userEmail },
      });

      setFollowedPlayers(updatedFollowedPlayers);
      setPlayers(Object.values(updatedFollowedPlayers));
    } catch (error) {
      console.error('Error processing follow/unfollow action:', error);
    }
  };

  const renderPlayers = () => {
		if (players.length === 0) {
			return (
				<div className="no-players-message">
					No followed players. Followed players will appear here.
				</div>
			);
		}
	
		return (
      <div className="players-scroll-container">
        <div className="players-row">
          {players.map((player, index) => (
            <PlayerCard
              key={index}
              id={player.id}
              img={player.img}
              name={player.name}
              position={player.position}
              height={player.height}
              teamName={player.team_name}
              teamCity={player.team_city}
              // stats={player.stats}
              isFollowed={!!followedPlayers[player.id]}
              onToggleFollow={() => toggleFollow(player.id)}
            />
          ))}
        </div>
      </div>
		);
	};

  return (
    <div className="user-player">
      <div className="player-header">
        <h3>My Players</h3>
      </div>
      {loading ? (
      <Loading />
      ) : (
        <div className="players">
          {renderPlayers()}
        </div>
      )}
    </div>
  );
};

export default UserPlayers;