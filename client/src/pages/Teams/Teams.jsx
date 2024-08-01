import React, { useState, useEffect } from 'react';
import TeamCard from '../../components/TeamCard/TeamCard';
import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
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

  useEffect(() => {
    fetch('http://localhost:5002/api/nba/teams')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
        setSortedTeams(data);
      })
      .catch(error => console.error('Error fetching teams:', error));
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
      sorted = sorted.filter((team) => followedTeams[team.full_name]);
    }
    setSortedTeams(sorted);
  }, [sortOrder, showFollowed, teams, followedTeams]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'default' ? 'a-z' : 'default');
  };

  const toggleFollow = (teamName) => {
    setFollowedTeams((prev) => ({
      ...prev,
      [teamName]: !prev[teamName],
    }));
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
            key={team.id || index}
            img={team.logo_path}
            title={team.full_name}
            description={team.description}
            link={'http://localhost:5173/teams'}
            isFollowed={!!followedTeams[team.full_name]}
            onToggleFollow={() => toggleFollow(team.full_name)}
          />
        ))}
      </div>
    );
  };


  return (
    <div className="teams-page">
      <div className='teams-header'>
        <div className='header-title'>
          <br />
          <br />
          <AnimateLetters letterClass={letterClass} strArray={"Teams".split("")} idx={1} />
        </div>
        <div className='header-options'>
          <button className="default" onClick={() => setView('grid')}>
            <p className="text">Default</p>
          </button>
          <button className="a-z" onClick={handleSort}>
            <p className="text">A-Z</p>
          </button>
          <button className="list-view" onClick={() => setView('list')}>
            <p className="text">List View</p>
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
    </div>
  );
};

export default Teams;







// import React, { useState, useEffect } from 'react';
// import TeamCard from '../../components/TeamCard/TeamCard';
// import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
// import './Teams.scss';

// const Teams = ({ teams = [] }) => {
//   const getCardsPerRow = (width) => {
//     if (width > 900) return 4;
//     if (width > 600) return 2;
//     return 1;
//   };

//   const [view, setView] = useState('grid');
//   const [sortedTeams, setSortedTeams] = useState(teams);
//   const [letterClass, setLetterClass] = useState('text-animate');
//   const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));
//   const [sortOrder, setSortOrder] = useState('default'); 
//   const [followedTeams, setFollowedTeams] = useState({});
//   const [showFollowed, setShowFollowed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setCardsPerRow(getCardsPerRow(window.innerWidth));
//     };

//     window.addEventListener('resize', handleResize);

//     const timerId = setTimeout(() => {
//       setLetterClass('text-animate-hover');
//     }, 4000);

//     return () => {
//       clearTimeout(timerId);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     let sorted = [...teams];
//     if (sortOrder === 'a-z') {
//       sorted.sort((a, b) => a.title.localeCompare(b.title));
//     }
//     if (showFollowed) {
//       sorted = sorted.filter((team) => followedTeams[team.title]);
//     }
//     setSortedTeams(sorted);
//   }, [sortOrder, showFollowed, teams, followedTeams]);

//   const handleSort = () => {
//     setSortOrder(sortOrder === 'default' ? 'a-z' : 'default');
//   };

//   const toggleFollow = (teamTitle) => {
//     setFollowedTeams((prev) => ({
//       ...prev,
//       [teamTitle]: !prev[teamTitle],
//     }));
//   };

//   const renderTeams = () => {
//     if (showFollowed && sortedTeams.length === 0) {
//       return (
//       <div className="no-teams-message">
//         No followed teams. Followed teams will appear here.
//       </div>
//       );
//     };

//     if (view === 'list') {
//       return (
//         <div className="teams-list">
//           {sortedTeams.map((team, index) => (
//             <div key={index} className="team-list-item">
//               <img src={team.img} alt={`${team.title} logo`} className="team-logo" />
//               <span className="team-name">{team.title}</span>
//               <span className="team-description">{team.description}</span>
//             </div>
//           ))}
//         </div>
//       );
//     };

//     return (
//       <div className="teams-grid" style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}>
//         {sortedTeams.map((team, index) => (
//           <TeamCard
//             key={team.id || index}
//             img={team.img}
//             title={team.title}
//             description={team.description}
//             link={team.link}
//             isFollowed={!!followedTeams[team.title]}
//             onToggleFollow={() => toggleFollow(team.title)}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="teams-page">
//       <div className='teams-header'>
//         <div className='header-title'>
//           <br />
//           <br />
//           <AnimateLetters letterClass={letterClass} strArray={"Teams".split("")} idx={1} />
//         </div>
//         <div className='header-options'>
//           <button className="default" onClick={() => setView('grid')}>
//             <p className="text">Default</p>
//           </button>
//           <button className="a-z" onClick={handleSort}>
//             <p className="text">A-Z</p>
//           </button>
//           <button className="list-view" onClick={() => setView('list')}>
//             <p className="text">List View</p>
//           </button>
//           <button
//             className={`followed-teams ${showFollowed ? 'highlighted' : ''}`}
//             onClick={() => setShowFollowed((prev) => !prev)}
//           >
//             {showFollowed ? "All Teams" : "My Teams"}
//           </button>

//         </div>
//       </div>
//       <hr className="page-break" />
//       {renderTeams()}
//     </div>
//   );
// };

// export default Teams;