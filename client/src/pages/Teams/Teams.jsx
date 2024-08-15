import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import TeamCard from '../../components/TeamCard/TeamCard';
import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
import Loading from '../../components/Loading/Loading';
import './Teams.scss';

const Teams = () => {
  const getCardsPerRow = (width) => {
    if (width > 900) return 4;
    if (width > 600) return 2;
    return 1;
  };

  const [view, setView] = useState('grid');
  const [teams, setTeams] = useState([]);
  const [sortedTeams, setSortedTeams] = useState([]);
  const [letterClass, setLetterClass] = useState('text-animate');
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));
  const [sortOrder, setSortOrder] = useState('default'); 
  const [followedTeams, setFollowedTeams] = useState({});
  const [showFollowed, setShowFollowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/nba/teams');
        setTeams(response.data);
        setSortedTeams(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };
  
    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchFollowedTeams = async () => {
      try {
        const session = await fetchAuthSession();
        const userEmail = session.tokens.idToken.payload.email;

        const response = await axios.get('http://localhost:5002/api/followed-teams', {
          params: { email: userEmail },
        });

        const teams = response.data.reduce((acc, teamId) => {
          acc[teamId] = true;
          return acc;
        }, {});

        setFollowedTeams(teams);
      } catch (error) {
        console.error('Error fetching followed teams:', error);
      }
    };

    fetchFollowedTeams();
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
    let sorted = [...teams];
    if (sortOrder === 'a-z') {
      sorted.sort((a, b) => a.full_name.localeCompare(b.full_name));
    }
    if (showFollowed) {
      sorted = sorted.filter((team) => followedTeams[team.id]);
    }
    setSortedTeams(sorted);
  }, [sortOrder, showFollowed, teams, followedTeams]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'default' ? 'a-z' : 'default');
  };

  const toggleFollow = async (teamId) => {
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;

      setFollowedTeams((prev) => {
        const isFollowing = !prev[teamId];
        return {
          ...prev,
          [teamId]: isFollowing,
        };
      });

      const isFollowing = !followedTeams[teamId];
      
      if (isFollowing) {
        axios.post('http://localhost:5002/api/user-teams', { teamId, email: userEmail })
          .then(response => {
            console.log('Team followed successfully:', response.data);
          })
          .catch(error => {
            console.error('Error following team:', error);
          });
      } else {
        axios.delete(`http://localhost:5002/api/user-teams/${teamId}`, { data: { email: userEmail } })
          .then(response => {
            console.log('Team unfollowed successfully:', response.data);
          })
          .catch(error => {
            console.error('Error unfollowing team:', error);
          });
      }
    } catch (error) {
      console.error('Error fetching user session or processing follow action:', error);
    }
  };

  const renderTeams = () => {
    if (showFollowed && sortedTeams.length === 0) {
      return (
        <div className="no-teams-message">
          No followed teams. Followed teams will appear here.
        </div>
      );
    }

    if (view === 'list') {
      return (
        <div className="teams-list">
          {sortedTeams.map((team, index) => (
            <div key={index} className="team-list-item">
              <img src={team.logo_path} alt={`${team.full_name} logo`} className="team-logo" />
              <span className="team-name">{team.full_name}</span>
              <span className="team-description">{team.city}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="teams-grid" style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}>
        {sortedTeams.map((team, index) => (
          <TeamCard
            key={index}
            id={team.id}
            img={team.logo_path}
            title={team.full_name}
            description={team.description}
            isFollowed={!!followedTeams[team.id]}
            onToggleFollow={() => toggleFollow(team.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="teams-page">
      {loading ? (
      <Loading />
      ) : (
        <>
          <div className='teams-header'>
            <div className='header-title'>
              <br />
              <br />
              <AnimateLetters letterClass={letterClass} strArray={"View Teams".split("")} idx={1} />
            </div>
            <div className='header-options'>
              <button className="default-list-teams" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
                {view === 'grid' ? <p className="text">List View</p> : <p className="text">Default</p>}
              </button>
              <button className="a-z" onClick={handleSort}>
                <p className="text">A-Z</p>
              </button>
              <button
                className={`followed-teams ${showFollowed ? 'highlighted' : ''}`}
                onClick={() => setShowFollowed((prev) => !prev)}
              >
                {showFollowed ? "All Teams" : "My Teams"}
              </button>
            </div>
          </div>
          <hr className="page-break" />
          {renderTeams()}
        </>
      )}
    </div>
  );
};

export default Teams;