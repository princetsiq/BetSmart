import React from 'react'
import '../ImageCarousel/ImageCarousel.scss'
import nbaLogo from '../../assets/logos/nba.svg'
import nflLogo from '../../assets/logos/nfl.svg'
import nhlLogo from  '../../assets/logos/nhl.jpeg'
import wnbaLogo from '../../assets/logos/wnba.png'
import ufcLogo from '../../assets/logos/ufc.png'

const ImageCarousel = () => {
  return (
    <div class="logos">
      <div class="logo-scroller">
        <img src={nbaLogo} alt="nba" />
        <img src= {nflLogo} alt="nfl" />
        <img src={nhlLogo} alt="nhl"/>
        <img src={ufcLogo} alt ="ufc"/>
        <img src={wnbaLogo} alt="wnba"/>
      </div>

      <div class="logo-scroller">
        <img src={nbaLogo} alt="nba" />
        <img src= {nflLogo} alt="nfl" />
        <img src={nhlLogo} alt="nhl"/>
        <img src={ufcLogo} alt ="ufc"/>
        <img src={wnbaLogo} alt="wnba"/>
      </div>
    </div>
  );
};

export default ImageCarousel;