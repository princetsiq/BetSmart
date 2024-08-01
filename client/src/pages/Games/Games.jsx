import React, { useState, useEffect } from "react";
import GameCard from "../../components/GameCard/GameCard";
import AnimateLetters from "../../components/AnimateLetters/AnimateLetters";
import "./Games.scss";

const Games = () => {
  const getCardsPerRow = (width) => {
    if (width > 900) return 3;
    if (width > 600) return 2;
    return 1;
  };

  const [view, setView] = useState("grid");
  const [games, setGames] = useState([]);
  const [sortedGames, setSortedGames] = useState([]);
  const [letterClass, setLetterClass] = useState("text-animate");
  const [cardsPerRow, setCardsPerRow] = useState(
    getCardsPerRow(window.innerWidth)
  );
  const [sortOrder, setSortOrder] = useState("default");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    fetchGames();
  }, [page]);

  const fetchGames = () => {
    fetch(
      `http://localhost:5002/api/nba/games?page=${page}&page_size=${pageSize}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGames((prevGames) => [...prevGames, ...data]);
        setSortedGames((prevGames) => [...prevGames, ...data]);
      })
      .catch((error) => console.error("Error fetching games:", error));
  };

  // useEffect(() => {
  //   fetch('http://localhost:5002/api/nba/games')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setGames(data);
  //       setSortedGames(data);
  //     })
  //     .catch(error => console.error('Error fetching teams:', error));
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerRow(getCardsPerRow(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    const timerId = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let sorted = [...games];
    if (sortOrder === "a-z") {
      sorted.sort((a, b) => a.HOME_TEAM_NAME.localeCompare(b.HOME_TEAM_NAME));
    }
    setSortedGames(sorted);
  }, [sortOrder, games]);

  const handleSort = () => {
    setSortOrder(sortOrder === "default" ? "a-z" : "default");
  };

  const renderGames = () => {
    if (view === "list") {
      return (
        <div className="games-list">
          {sortedGames.map((game, index) => (
            <div key={index} className="game-list-item">
              <img
                src={game.HOME_TEAM_LOGO_PATH}
                alt={`${game.HOME_TEAM_NAME} logo`}
                className="team-logo"
              />
              <span className="team-name">{game.HOME_TEAM_NAME}</span>
              <p>vs </p>
              <span className="team-name">{game.AWAY_TEAM_NAME}</span>
              <img
                src={game.AWAY_TEAM_LOGO_PATH}
                alt={`${game.AWAY_TEAM_NAME} logo`}
                className="team-logo"
              />
              <span className="game-date">{game.GAME_DATE}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <>
        <div
          className="games-grid"
          style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}
        >
          {sortedGames.map((game, index) => (
            <GameCard
              key={index}
              game={{
                homeTeamLogo: game.HOME_TEAM_LOGO_PATH,
                awayTeamLogo: game.AWAY_TEAM_LOGO_PATH,
                homeTeamName: game.HOME_TEAM_ABBREVIATION,
                awayTeamName: game.AWAY_TEAM_ABBREVIATION,
                gameDate: game.GAME_DATE,
              }}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="games-page">
      <div className="game-header">
        <div className="header-title">
          <br />
          <br />
          <AnimateLetters
            letterClass={letterClass}
            strArray={"Upcoming Games".split("")}
            idx={1}
          />
        </div>
        <div className="header-options">
          <button className="default" onClick={() => setView("grid")}>
            <p className="text">Default</p>
          </button>
          <button className="a-z" onClick={handleSort}>
            <p className="text">A-Z</p>
          </button>
          <button className="list-view" onClick={() => setView("list")}>
            <p className="text">List View</p>
          </button>
        </div>
      </div>
      <hr className="page-break" />
      {renderGames()}
      <div className="load-more-container">
        <button
          className="load-more"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          <p className="text">Load More Games</p>
        </button>
      </div>
    </div>
  );
};

export default Games;
