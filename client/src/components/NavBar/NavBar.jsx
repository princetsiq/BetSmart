import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
	return(
		<nav className='navbar'>
			<Link to='/' className='site-title'>BetSmart</Link>
			<ul className="pages">
				<Link to="/games">Games</Link>
				<Link to="/teams">Teams</Link>
				<Link to="/who-we-are">Who We Are</Link>
				<Link to="/my-profile">My Profile</Link>
			</ul>
		</nav>
	);
};

export default NavBar;