import React from "react";
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel.jsx'
// import './Home.css';
import './Home.scss';

const Home = () => {
	return (
		<>
			<h1 className='header'>
				Pick <i>players, sit</i> back and <i>win</i> some bets.
			</h1>
			<ImageCarousel/>
		</>
	);
};

export default Home;