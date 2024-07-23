import React from "react"
import './Home.css'
import ImageCarousel from '../components/ImageCarousel.jsx'

function Home(){
    return(
        <>
            <h1 className='header'>
                Pick <i>players, sit </i> back and <i>win </i> some bets.
            </h1>

            <ImageCarousel/>

            
        </>

    );
}

export default Home