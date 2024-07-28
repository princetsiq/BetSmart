import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
import './Game.scss';

const Games = ({ games = [] }) => {
  const getCardsPerRow = (width) => {
    if (width > 900) return 3;
    if (width > 600) return 2;
    return 1;
  };

  const [view, setView] = useState('grid');
  const [sortedGames, setSortedGames] = useState(games);
  const [letterClass, setLetterClass] = useState('text-animate');
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));
  const [sortOrder, setSortOrder] = useState('default'); 

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
    let sorted = [...games];
    if (sortOrder === 'a-z') {
      sorted.sort((a, b) => a.team1.localeCompare(b.team1));
    }
    setSortedGames(sorted);
  }, [sortOrder, games]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'default' ? 'a-z' : 'default');
  };

  const renderGames = () => {
    if (view === 'list') {
      return (
        <div className="games-list">
          {sortedGames.map((game, index) => (
            <div key={index} className="game-list-item">
              <img src={game.team1Logo} alt={`${game.team1} logo`} className="team-logo" />
              <span className="team-name">{game.team1}</span> 
              <p>vs </p> 
              <span className="team-name">{game.team2}</span>
              <img src={game.team2Logo} alt={`${game.team2} logo`} className="team-logo" />
              <span className="game-date">{game.date}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="games-grid" style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}>
        {sortedGames.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    );
  };

  return (
    <div className="games-page">
      <div className='game-header'>
        <div className='header-title'>
          <br />
          <br />
          <AnimateLetters letterClass={letterClass} strArray={"Upcoming Games".split("")} idx={1} />
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
        </div>
      </div>
      <hr className="page-break" />
      {renderGames()}
    </div>
  );
};

export default Games;