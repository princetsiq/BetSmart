import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel.jsx'
import { useAuth } from "../../components/Authentication/AuthContext.jsx";
import HomeCard from "../../components/HomeCard/HomeCard.jsx";
import homeImg from "../../assets/home.png"
import './Home.scss';

// const Home = () => {
// 	return (
// 		<>
// 			<h1 className='header'>
// 				Pick <i>players, sit</i> back and <i>win</i> some bets.
// 			</h1>
// 			<ImageCarousel/>
// 		</>
// 	);
// };

const Home = ({ teams = []}) => {
	const getCardsPerRow = (width) => {
    if (width > 600) return 1;
  };

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
	const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow(window.innerWidth));

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate('/games');
    } else {
      navigate('/login');
    }
  };

	useEffect(() => {
    const handleResize = () => {
      setCardsPerRow(getCardsPerRow(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="home">
      <h1 className="header">
        Pick <i>players, sit</i> back and <i>win</i> some bets.
      </h1>
			<div className="button-container">
        <button
          className="home-button"
          onClick={handleButtonClick}
        >
          {isAuthenticated ? "Browse Games" : "Log In"}
        </button>
      </div>
			<div className="home-container">
				<ImageCarousel />
				<div className="info-container">
					<div className="grid-container">
						<div className="home-grid" style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}>
							{teams.map((team, index) => (
								<HomeCard
									key={team.id || index}
									img={team.img}
									title={team.title}
								/>
							))}
						</div>

						{/* <div className="teams-list">
							{teams.map((team, index) => (
							<div key={index} className="team-list-item">
								<img src={team.img} alt={`${team.title} logo`} className="team-logo" />
								<span className="team-name">{team.title}</span>
							</div>
							))}
						</div> */}
					</div>
					<div className="home-img">
						<img src={homeImg} alt="home" className="circle-img" />
					</div>
				</div>
				<div className="what-we-believe">
					<div className="message">
						<h1>What We Believe</h1>
						<div className="part-1">
							<p>
								At BetSmart, we believe in transforming the sports betting experience through data-driven precision, 
								transparency, and user empowerment. Our advanced algorithms analyze vast amounts of historical and 
								real-time data to provide accurate predictions, giving our users a competitive edge. We are committed 
								to maintaining transparency in our predictions and processes, ensuring users can trust the information 
								we provide. By offering comprehensive analytics, intuitive visualizations, and expert insights, we help 
								users make smarter betting choices with confidence.
							</p>
						</div>
						<div className="part-2">
							<p>
								We also value continuous innovation, user-friendliness, and community. Our platform is designed with a 
								user-friendly interface, making it accessible for both novices and experienced bettors. By fostering a 
								supportive and interactive environment, we encourage users to share insights and strategies, enhancing 
								the collective knowledge of our community. We recognize the ethical responsibilities of sports betting 
								and promote responsible practices, ensuring a safe and enjoyable experience for all. Join us in 
								revolutionizing the sports betting landscape with precision, integrity, and community spirit.
							</p>
						</div>
					</div>
				</div>
			</div>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
    </div>
  );
};

export default Home;