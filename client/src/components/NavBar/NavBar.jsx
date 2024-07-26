import React from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import './NavBar.scss';
// import './NavBar.css';

const NavBar = () => {
	return(
		<nav className='navbar'>
			<Link to='/' className='site-title'>BetSmart</Link>
			<ul className="pages">
				<CustomLink to="/games">Games</CustomLink>
				<CustomLink to="/teams">Teams</CustomLink>
				<CustomLink to="/who-we-are">Who We Are</CustomLink>
				<CustomLink to="/my-profile">My Profile</CustomLink>
			</ul>
		</nav>
	);
};

function CustomLink({ to, children, ...props }) {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<Link to={to} {...props} className={isActive ? "clicked" : ""}> {children} </Link>
	);
};

export default NavBar;