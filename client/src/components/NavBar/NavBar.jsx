import React from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
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

// const NavBar = () => {
// 	return(
// 		<nav className='navbar'>
// 			<Link to='/' className='site-title'>BetSmart</Link>
// 			<ul className="pages">
// 				<CustomLink to="/games">Games</CustomLink>
// 				<CustomLink to="/teams">Teams</CustomLink>
// 				<CustomLink to="/who-we-are">Who We Are</CustomLink>
// 				<CustomLink to="/my-profile">My Profile</CustomLink>
// 			</ul>
// 		</nav>
// 	);
// };

// function CustomLink({ to, children, ...props }) {
// 	const resolvedPath = useResolvedPath(to);
// 	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

// 	return (
// 		<li className={isActive ? "active" : ""}>
// 			<Link to={to} {...props}> {children} </Link>
// 		</li>
// 	);
// };

// export default NavBar;