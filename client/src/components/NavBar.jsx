import React from 'react'
import '../components/NavBar.css'
import {Link, useMatch, useResolvedPath} from 'react-router-dom'

function NavBar(){

    return(
        <nav className='navbar'>
            <Link to='/' className='site-title'>
                BetSmart
            </Link>
                <ul className="pages">
                    <CustomLink to="/sports"> Games </CustomLink>
                    <CustomLink to="/teams"> Teams </CustomLink>
                    <CustomLink to="/whoweare"> Who We Are </CustomLink>
                    <CustomLink to="/myprofile"> My Profile </CustomLink>
                </ul>
        </nav>

    );
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return(
        <li className={isActive ? "active": ""}> 
            <Link to={to} {...props}> {children} </Link>
        </li>

    );
}

export default NavBar