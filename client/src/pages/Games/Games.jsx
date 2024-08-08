import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import AnimateLetters from '../../components/AnimateLetters/AnimateLetters';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loading from '../../components/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import './Games.scss';

const fetchSeasons = async () => {
  const response = await fetch('http://localhost:5002/api/nba/seasons');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const fetchGames = async (season, seasonType) => {
  const response = await fetch(`http://localhost:5002/api/nba/games?season=${season}&seasonType=${seasonType}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const Games = () => {
  const getCardsPerRow = (width) => {
    if (width > 900) return 3;
    if (width > 600) return 2;
    return 1;
  };

  const [view, setView] = useState('grid');
  const [games, setGames] = useState([]);
  const [sortedGames, setSortedGames] = useState([]);
  const [letterClass, setLetterClass] = useState('text-animate');
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));
  const [sortOrder, setSortOrder] = useState('default'); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedSeasonType, setSelectedSeasonType] = useState('Regular Season');

  const [showFilters, setShowFilters] = useState(false);
  const [tempSeason, setTempSeason] = useState(selectedSeason);
  const [tempGameType, setTempGameType] = useState(selectedSeasonType);

  const handleApplyFilters = async () => {
    setLoading(true);
    setShowFilters(false);
    try {
      const games = await fetchGames(tempSeason, tempGameType);
      setGames(games);
      setSortedGames(games.slice(0, 30));
      setTotalPages(Math.ceil(games.length / 30));
      setSelectedSeason(tempSeason);
      setSelectedSeasonType(tempGameType);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const seasons = await fetchSeasons();
        setSeasons(seasons);
        const currentSeason = seasons[seasons.length - 1];
        setSelectedSeason(currentSeason);  
        const games = await fetchGames(currentSeason, 'Regular Season');
        setGames(games);
        setSortedGames(games.slice(0, 30));
        setTotalPages(Math.ceil(games.length / 30));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadInitialData();
  }, []);

  const handleSort = () => {
    const newSortOrder = sortOrder === 'default' ? 'a-z' : 'default';
    updateSortedGames(games, page, newSortOrder);
    setSortOrder(newSortOrder);
  };

  const updateSortedGames = (games, page, sortOrder) => {
    let sorted = [...games];
    const newStart = (page - 1) * 30;
    const newEnd = newStart + 30;
    let pageGames = sorted.slice(newStart, newEnd);
    if (sortOrder === 'a-z') {
      pageGames.sort((a, b) => a.HOME_TEAM_NAME.localeCompare(b.HOME_TEAM_NAME));
    }
    setSortedGames(pageGames);
  };

  const handlePageChange = (_, value) => {
    setSortOrder('default');
    updateSortedGames(games, value, 'default');
    setPage(value);
  };

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

  const renderGames = () => {
    if (view === 'list') {
      return (
        <div className="games-list">
          {sortedGames.map((game, index) => (
            <div key={index} className="game-list-item">
              <img src={game.HOME_TEAM_LOGO_PATH} alt={`${game.HOME_TEAM_NAME} logo`} className="team-logo" />
              <span className="team-name">{game.HOME_TEAM_NAME}</span>
              <p>vs </p>
              <span className="team-name">{game.AWAY_TEAM_NAME}</span>
              <img src={game.AWAY_TEAM_LOGO_PATH} alt={`${game.AWAY_TEAM_NAME} logo`} className="team-logo" />
              <span className="game-date">{game.GAME_DATE}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="games-grid" style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}>
        {sortedGames.map((game, index) => (
          <GameCard 
            key={index} 
            game={game} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="games-page">
      {loading ? (
      <Loading />
      ) : (
        <>
          <div className='game-header'>
            <div className='header-title'>
              <br />
              <br />
              <AnimateLetters letterClass={letterClass} strArray={"Past Games".split("")} idx={1} />
            </div>
            <div className='header-options'>
              <div className="filter-container">
                <button onClick={() => setShowFilters(prev => !prev)} className={`filter-button ${showFilters ? "clicked" : ""}`}>
                  <FontAwesomeIcon icon={faBars} />
                </button>
                {showFilters && (
                  <div className="filter-popup">
                    <button onClick={() => setShowFilters(false)} className="close-popup-button">
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="filter-popup-content">
                      <h3>Filter</h3>
                      <select onChange={(e) => setTempSeason(e.target.value)} value={tempSeason} className="season">
                        {seasons.map((season, index) => (
                          <option key={index} value={season}>
                            {season}
                          </option>
                        ))}
                      </select>
                      <select onChange={(e) => setTempGameType(e.target.value)} value={tempGameType} className="season-type">
                        <option value="Regular Season">Regular Season</option>
                        <option value="Playoffs">Playoffs</option>
                      </select>
                      <button onClick={handleApplyFilters} className="apply-filters-button">Apply</button>
                    </div>
                  </div>
                )}
              </div>
              <button className="default-list-games" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
                {view === 'grid' ? <p className="text">List View</p> : <p className="text">Default</p>}
              </button>
              <button className="a-z" onClick={handleSort}>
                <p className="text">A-Z</p>
              </button>
            </div>
          </div>
          <hr className="page-break" />
          {renderGames()}
          <div className="load-more-container">
            <Stack spacing={2} className="pagination-container">
              <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Stack>
          </div>
        </>
      )}
    </div>
  );
};

export default Games;