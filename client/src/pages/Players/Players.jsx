import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useSearchParams } from 'react-router-dom';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import GameCard from '../../components/GameCard/GameCard';
import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
import Loading from '../../components/Loading/Loading';
import './Players.scss'; 

import gsw from "../../assets/teams/gsw.png";
import lal from "../../assets/teams/lal.png";
import nyk from "../../assets/teams/nyk.png";
import okc from "../../assets/teams/okc.png";
import ptb from "../../assets/teams/ptb.png";

const upcomingGames = [
  // {
  //   HOME_TEAM_LOGO_PATH: gsw,
  //   HOME_TEAM_ABBREVIATION: 'GSW',
  //   GAME_DATE: '2024-15-09',
  //   AWAY_TEAM_LOGO_PATH: lal,
  //   AWAY_TEAM_ABBREVIATION: 'LAL',
  // },
  // {
  //   HOME_TEAM_LOGO_PATH: nyk,
  //   HOME_TEAM_ABBREVIATION: 'NYK',
  //   GAME_DATE: '2024-15-09',
  //   AWAY_TEAM_LOGO_PATH: okc,
  //   AWAY_TEAM_ABBREVIATION: 'OKC',
  // },
  // {
  //   HOME_TEAM_LOGO_PATH: lal,
  //   HOME_TEAM_ABBREVIATION: 'LAL',
  //   GAME_DATE: '2024-17-09',
  //   AWAY_TEAM_LOGO_PATH: ptb,
  //   AWAY_TEAM_ABBREVIATION: 'PTB',
  // },
  // {
  //   HOME_TEAM_LOGO_PATH: okc,
  //   HOME_TEAM_ABBREVIATION: 'OKC',
  //   GAME_DATE: '2024-19-09',
  //   AWAY_TEAM_LOGO_PATH: gsw,
  //   AWAY_TEAM_ABBREVIATION: 'GSW',
  // },
  // {
  //   HOME_TEAM_LOGO_PATH: ptb,
  //   HOME_TEAM_ABBREVIATION: 'PTB',
  //   GAME_DATE: '2024-21-09',
  //   AWAY_TEAM_LOGO_PATH: nyk,
  //   AWAY_TEAM_ABBREVIATION: 'NYL',
  // },
];

const getCardsPerRow = (width) => {
	if (width * 0.67 > 900) return 3;
	if (width * 0.67 > 600) return 2;
	return 1;
};

const Players = () => {
  const [view, setView] = useState('grid');
  const [players, setPlayers] = useState([]);
  const [sortedPlayers, setSortedPlayers] = useState([]);
  const [letterClass, setLetterClass] = useState('text-animate');
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));
  const [sortOrder, setSortOrder] = useState('default'); 
  const [followedPlayers, setFollowedPlayers] = useState({});
  const [showFollowed, setShowFollowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('teamId');
	const teamName = decodeURIComponent(searchParams.get('teamName'));

	useEffect(() => {
		const fetchPlayerDetails = async () => {
			try {
				const response = await axios.get(`http://localhost:5002/api/nba/player-details`, {
					params: { teamId }
				});
				setPlayers(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching player details:', error);
				setLoading(false);
			}
		};
	
		if (teamId) {
			fetchPlayerDetails();
		}
	}, [teamId]);

	useEffect(() => {
    const fetchFollowedPlayers = async () => {
      try {
        const session = await fetchAuthSession();
        const userEmail = session.tokens.idToken.payload.email;

        const response = await axios.get('http://localhost:5002/api/followed-players', {
          params: { email: userEmail },
        });

        const players = response.data.reduce((acc, playerId) => {
          acc[playerId] = true;
          return acc;
        }, {});

        setFollowedPlayers(players);
      } catch (error) {
        console.error('Error fetching followed players:', error);
      }
    };

    fetchFollowedPlayers();
  }, []);

	useEffect(() => {
    const handleResize = () => {
      setCardsPerRow(getCardsPerRow(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    const timerId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let sorted = [...players];
    if (sortOrder === 'a-z') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (showFollowed) {
      sorted = sorted.filter((player) => followedPlayers[player.id]);
    }
    setSortedPlayers(sorted);
  }, [sortOrder, showFollowed, players, followedPlayers]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'default' ? 'a-z' : 'default');
  };

	const toggleFollow = async (playerId) => {
    console.log(`toggleFollow called for playerId: ${playerId}`);
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;

      setFollowedPlayers((prev) => {
        const isFollowing = !prev[playerId];
        return {
          ...prev,
          [playerId]: isFollowing,
        };
      });

      const isFollowing = !followedPlayers[playerId];
      
      if (isFollowing) {
        axios.post('http://localhost:5002/api/user-players', { playerId, email: userEmail })
          .then(response => {
            console.log('Player followed successfully:', response.data);
          })
          .catch(error => {
            console.error('Error following player:', error);
          });
      } else {
        axios.delete(`http://localhost:5002/api/user-players/${playerId}`, { data: { email: userEmail } })
          .then(response => {
            console.log('Player unfollowed successfully:', response.data);
          })
          .catch(error => {
            console.error('Error unfollowing player:', error);
          });
      }
    } catch (error) {
      console.error('Error fetching user session or processing follow action:', error);
    }
  };

	const renderPlayers = () => {
		if (showFollowed && sortedPlayers.length === 0) {
			return (
				<div className="no-players-message">
					No followed players. Followed players will appear here.
				</div>
			);
		}
	
		if (view === 'list') {
			return (
				<div className="players-list">
					{sortedPlayers.map((player, index) => (
						<div key={index} className="player-list-item">
							<img src={player.img} alt={`${player.name} logo`} className="player-image" />
							<span className="player-name">{player.name}</span>
							<span className="player-description">{player.city}</span>
						</div>
					))}
				</div>
			);
		}
	
		return (
			<div className="players-grid" style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}>
				{sortedPlayers.map((player, index) => (
					<PlayerCard
						key={index}
						id={player.id}
						img={player.img}
						name={player.name}
						position={player.position}
						height={player.height}
						teamName={player.team_name}
						teamCity={player.team_city}
						stats={player.stats}
            isFollowed={!!followedPlayers[player.id]}
						onToggleFollow={() => toggleFollow(player.id)}
					/>
				))}
			</div>
		);
	};

	const renderUpcomingGames = () => {
		if (upcomingGames.length === 0) {
			return (
				<div className="no-players-message">
					No upcoming games. Upcoming game details will appear here.
				</div>
			);
		}

    return (
      <div className='upcoming-games' style={{ gridTemplateColumns: `repeat(1, 1fr)` }}>
        {upcomingGames.map((game, index) => (
          <GameCard 
            key={index}
            game={game}
          />
        ))}
      </div>
    );
  };
	
	return (
		<div className="players-page">
			{loading ? (
			<Loading />
			) : (
				<>
					<div className='players-header'>
						<div className='player-header-title'>
							<br />
							<br />
							<AnimateLetters letterClass={letterClass} strArray={`${teamName}`.split("")} idx={1} />
						</div>
						<div className='player-header-options'>
							<button className="default-list-players" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
								{view === 'grid' ? <p className="text">List View</p> : <p className="text">Default</p>}
							</button>
							<button className="a-z" onClick={handleSort}>
								<p className="text">A-Z</p>
							</button>
							<button
								className={`followed-players ${showFollowed ? 'highlighted' : ''}`}
								onClick={() => setShowFollowed((prev) => !prev)}
							>
								{showFollowed ? "All Players" : "My Players"}
							</button>
						</div>
					</div>
					<hr className="page-break" />
					<div className='team-displays'>
						<br />
						<div className='team-games-display'>
							<h1>Upcoming Games</h1>
							<div className='scrollable-left'>
								{renderUpcomingGames()}  
							</div>
						</div> 
						{/* <div className='divider'>
							<div className='divider-1' />
							<div className='divider-2' />
						</div> */}
						<div className='team-players-display'>
							<h1>Roster</h1>
							<div className='scrollable-right'>
								{renderPlayers()}  
							</div>  
						</div>      
					</div>
				</>
			)}
		</div>
	);
};

export default Players;