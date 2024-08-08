import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
import Loading from '../../components/Loading/Loading';
import './Players.scss'; 

const getCardsPerRow = (width) => {
	if (width > 900) return 4;
	if (width > 600) return 2;
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
    if (teamId) {
      fetch(`http://localhost:5002/api/nba/player-details?teamId=${teamId}`)
        .then(response => response.json())
        .then(data => {
          setPlayers(data);
          setLoading(false);
        })
        .catch(error => console.error('Error fetching player details:', error));
    }
  }, [teamId]);

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

  const toggleFollow = (playerId) => {
    setFollowedPlayers((prev) => ({
      ...prev,
      [playerId]: !prev[playerId],
    }));
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
					{renderPlayers()}
				</>
			)}
		</div>
	);
};

export default Players;