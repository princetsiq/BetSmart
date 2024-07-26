// import React, { useState, useEffect } from "react";
// import TeamCard from "../../components/TeamCard/TeamCard";
// import "./Teams.scss";
// import AnimateLetters from "../../components/AnimateLetters/AnimateLetters";

// const Teams = ({ teams = [] }) => {
//   const [letterClass, setLetterClass] = useState("text-animate");
//   const [cardsPerRow, setCardsPerRow] = useState(
//     getCardsPerRow(window.innerWidth)
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       setCardsPerRow(getCardsPerRow(window.innerWidth));
//     };

//     window.addEventListener("resize", handleResize);

//     const timerId = setTimeout(() => {
//       setLetterClass("text-animate-hover");
//     }, 4000);

//     return () => {
//       clearTimeout(timerId);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const cardsData = teams.map((team, index) => ({
//     img: team.img || heat,
//     title: team.title || "Team Name",
//     description: team.description || placeholderDesc,
//     link: team.link || pLink,
//   }));

//   return (
//     <>
//       <div className="followed-page">
//         <div className="followed-header">
//           <div className="header-title">
//             <br />
//             <br />
//             <AnimateLetters
//               letterClass={letterClass}
//               strArray={"Teams".split("")}
//               idx={1}
//             />
//           </div>
//           <div className="header-options">
//             <button className="default">
//               <p className="text">Default</p>
//             </button>
//             <button className="a-z">
//               <p className="text">A-Z</p>
//             </button>
//             <button className="list-view">
//               <p className="text">List View</p>
//             </button>
//             <button className="followed-teams">
//               <p className="text">My Teams</p>
//             </button>
//           </div>
//         </div>
//         <hr className="page-break" />
//         <div
//           className="followed-page-container"
//           style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}
//         >
//           {cardsData.map((card, index) => (
//             <TeamCard
//               key={index}
//               img={card.img}
//               title={card.title}
//               description={card.description}
//               link={card.link}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const getCardsPerRow = (width) => {
//   if (width > 900) return 4;
//   if (width > 600) return 2;
//   return 1;
// };

// export default Teams;





// import React, { useState, useEffect } from 'react';
// import TeamCard from '../../components/TeamCard/TeamCard';
// import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
// import './Teams.scss';

// const Teams = ({ teams = [] }) => {
//   const [letterClass, setLetterClass] = useState("text-animate");
//   const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));
//   const [followedTeams, setFollowedTeams] = useState({});
//   const [showFollowed, setShowFollowed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setCardsPerRow(getCardsPerRow(window.innerWidth));
//     };

//     window.addEventListener("resize", handleResize);

//     const timerId = setTimeout(() => {
//       setLetterClass("text-animate-hover");
//     }, 4000);

//     return () => {
//       clearTimeout(timerId);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const toggleFollow = (teamTitle) => {
//     setFollowedTeams((prev) => ({
//       ...prev,
//       [teamTitle]: !prev[teamTitle],
//     }));
//   };

//   const filteredTeams = showFollowed
//     ? teams.filter((team) => followedTeams[team.title])
//     : teams;

//   const cardsData = filteredTeams.map((team, index) => ({
//     id: team.id || index,
//     img: team.img || heat,
//     title: team.title || "Team Name",
//     description: team.description || placeholderDesc,
//     link: team.link || pLink,
//   }));

//   return (
//     <>
//       <div className="followed-page">
//         <div className="followed-header">
//           <div className="header-title">
//             <br />
//             <br />
//             <AnimateLetters
//               letterClass={letterClass}
//               strArray={"Teams".split("")}
//               idx={1}
//             />
//           </div>
//           <div className="header-options">
//             <button className="default">
//               <p className="text">Default</p>
//             </button>
//             <button className="a-z">
//               <p className="text">A-Z</p>
//             </button>
//             <button className="list-view">
//               <p className="text">List View</p>
//             </button>
//             <button className="followed-teams" onClick={() => setShowFollowed((prev) => !prev)}>
//               <p className="text">My Teams</p>
//             </button>
//           </div>
//         </div>
//         <hr className="page-break" />
//         <div
//           className="followed-page-container"
//           style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}
//         >
//           {cardsData.map((card, index) => (
//             <TeamCard
//               key={card.id}
//               img={card.img}
//               title={card.title}
//               description={card.description}
//               link={card.link}
//               isFollowed={!!followedTeams[card.title]}
//               onToggleFollow={() => toggleFollow(card.title)}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const getCardsPerRow = (width) => {
//   if (width > 900) return 4;
//   if (width > 600) return 2;
//   return 1;
// };

// export default Teams;




import React, { useState, useEffect } from 'react';
import TeamCard from '../../components/TeamCard/TeamCard';
import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
import './Teams.scss';

const Teams = ({ teams = [] }) => {
  const getCardsPerRow = (width) => {
    if (width > 900) return 4;
    if (width > 600) return 2;
    return 1;
  };

  const [view, setView] = useState('grid');
  const [sortedTeams, setSortedTeams] = useState(teams);
  const [letterClass, setLetterClass] = useState('text-animate');
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));
  const [sortOrder, setSortOrder] = useState('default'); 
  const [followedTeams, setFollowedTeams] = useState({});
  const [showFollowed, setShowFollowed] = useState(false);

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
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (showFollowed) {
      sorted = sorted.filter((team) => followedTeams[team.title]);
    }
    setSortedTeams(sorted);
  }, [sortOrder, showFollowed, teams, followedTeams]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'default' ? 'a-z' : 'default');
  };

  const toggleFollow = (teamTitle) => {
    setFollowedTeams((prev) => ({
      ...prev,
      [teamTitle]: !prev[teamTitle],
    }));
  };

  const renderTeams = () => {
    if (view === 'list') {
      return (
        <div className="teams-list">
          {sortedTeams.map((team, index) => (
            <div key={index} className="team-list-item">
              <img src={team.img} alt={`${team.title} logo`} className="team-logo" />
              <span className="team-name">{team.title}</span>
              <span className="team-description">{team.description}</span>
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
            img={team.img}
            title={team.title}
            description={team.description}
            link={team.link}
            isFollowed={!!followedTeams[team.title]}
            onToggleFollow={() => toggleFollow(team.title)}
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
          </button>
        </div>
      </div>
      <hr className="page-break" />
      {renderTeams()}
    </div>
  );
};

export default Teams;