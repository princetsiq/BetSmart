import React from 'react';
import { Link, useResolvedPath, useMatch, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import outputs from '../../../../server/amplify_outputs.json';
import './NavBar.scss';

Amplify.configure(outputs)

const NavBar = () => {
	const navigate = useNavigate();

	const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

	return (
		<nav className='navbar'>
			<Link to='/' className='site-title'>BetSmart</Link>
			<ul className='pages'>
				<div className='home-buttons'>
					<CustomLink to='/games'>Games</CustomLink>
				</div>
				<div className='home-buttons'>
					<CustomLink to='/teams'>Teams</CustomLink>
				</div>
				<div className='home-buttons'>
					<CustomLink to='/who-we-are'>Who We Are</CustomLink>
				</div>
				<div className='home-buttons log-out'>
					<Link onClick={handleLogout}>Logout</Link>
				</div>
				<div className='home-buttons'>
					<CustomLink to='/my-profile'>
						<FontAwesomeIcon icon={faUser} />
					</CustomLink>
				</div>
			</ul>
		</nav>
	);
};

function CustomLink({ to, children, ...props }) {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<Link to={to} {...props} className={isActive ? 'clicked' : ''}> {children} </Link>
	);
};

export default NavBar;