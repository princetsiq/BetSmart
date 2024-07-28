import React from 'react';
import { Link } from 'react-router-dom';
import './LandingBar.scss';

const LandingBar = () => {
	return (
		<nav className='navbar'>
			<Link to='/' className='site-title'>BetSmart</Link>
			<div className="landing-sign-up">
				<Link to="/sign-up">Sign Up</Link>			
			</div>
		</nav>
	);
};

export default LandingBar;