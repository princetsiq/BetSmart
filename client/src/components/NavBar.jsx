import React from 'react';
import '../components/NavBar.css'

function NavBar(){
    return(
        <nav className='navbar'>
            <a href='/' className='site-title'>
                BetSmart
            </a>
                <ul className="pages">
                    <li className="active"> 
                        <a href="/sports"> Sports </a>
                    </li>
                    <li> 
                        <a href="/players"> Teams </a>
                    </li>
                    <li>
                        <a href="/whoweare" > Who We Are </a>
                    </li>
                    <li> 
                        <a href="/myprofile"> My Profile </a>
                    </li>
                </ul>
        </nav>

    );
}

export default NavBar