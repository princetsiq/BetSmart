import React from 'react';
import { Link, useResolvedPath, useMatch, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';
import './NavBar.scss';

const NavBar = () => {
	// const { logout } = useAuth();
	// const navigate = useNavigate();

	// const handleLogout = (e) => {
	// 	e.preventDefault();
	// 	navigate("/");
  //   logout();
  // };

	return (
		<nav className='navbar'>
			<Link to="/" className='site-title'>BetSmart</Link>
			<ul className="pages">
				<div className="home-buttons">
					<CustomLink to="/games">Games</CustomLink>
				</div>
				<div className="home-buttons">
					<CustomLink to="/teams">Teams</CustomLink>
				</div>
				<div className="home-buttons">
					<CustomLink to="/who-we-are">Who We Are</CustomLink>
				</div>
				<div className="home-buttons">
					<CustomLink to="/my-profile">My Profile</CustomLink>
				</div>
				<div className="home-buttons log-out">
					{/* <Link onClick={handleLogout}>Logout</Link> */}
				</div>
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