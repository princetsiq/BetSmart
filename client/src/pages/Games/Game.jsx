import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
import './Game.scss';

const GamesPage = ({ games = [] }) => {
  const getCardsPerRow = (width) => {
    if (width > 900) return 3;
    if (width > 600) return 2;
    return 1;
  };

  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));
  const [letterClass, setLetterClass] = useState('text-animate');

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

  return (
    <div className="games-page">
      <div className='header'>
        <div className='header-title'>
          <br />
          <br />
          <AnimateLetters letterClass={letterClass} strArray={"Upcoming Games".split("")} idx={1} />
        </div>
        <div className='header-options'>
          <button className="default">
            <p className="text">Default</p>
          </button>
          <button className="a-z">
            <p className="text">A-Z</p>
          </button>
          <button className="list-view">
            <p className="text">List View</p>
          </button>
        </div>
      </div>
      <hr className="page-break" />
      <div className="games-grid" style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}>
        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;