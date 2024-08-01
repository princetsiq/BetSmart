import React, { useState, useEffect } from 'react'
import '../ImageCarousel/ImageCarousel.scss'
// import nbaLogo from '../../assets/logos/nba.svg'
// import nflLogo from '../../assets/logos/nfl.svg'
// import nhlLogo from  '../../assets/logos/nhl.jpeg'
// import wnbaLogo from '../../assets/logos/wnba.png'
// import ufcLogo from '../../assets/logos/ufc.png'

// const ImageCarousel = () => {
//   return (
//     <div className="logos">
//       <div className="logo-scroller">
//         <img src={nbaLogo} alt="nba" />
//         <img src= {nflLogo} alt="nfl" />
//         <img src={nhlLogo} alt="nhl"/>
//         <img src={ufcLogo} alt ="ufc"/>
//         <img src={wnbaLogo} alt="wnba"/>
//       </div>

//       <div className="logo-scroller">
//         <img src={nbaLogo} alt="nba" />
//         <img src= {nflLogo} alt="nfl" />
//         <img src={nhlLogo} alt="nhl"/>
//         <img src={ufcLogo} alt ="ufc"/>
//         <img src={wnbaLogo} alt="wnba"/>
//       </div>
//     </div>
//   );
// };

// export default ImageCarousel;


const logos = [
    "/team_logos/atl.png",
    "/team_logos/bos.png",
    "/team_logos/cle.png",
    "/team_logos/nop.png",
    "/team_logos/chi.png",
    "/team_logos/dal.png",
    "/team_logos/den.png",
    "/team_logos/gsw.png",
    "/team_logos/hou.png",
    "/team_logos/lac.png",
    "/team_logos/lal.png",
    "/team_logos/mia.png",
    "/team_logos/mil.png",
    "/team_logos/min.png",
    "/team_logos/bkn.png",
    "/team_logos/nyk.png",
    "/team_logos/orl.png",
    "/team_logos/ind.png",
    "/team_logos/phi.png",
    "/team_logos/phx.png",
    "/team_logos/por.png",
    "/team_logos/sac.png",
    "/team_logos/sas.png",
    "/team_logos/okc.png",
    "/team_logos/tor.png",
    "/team_logos/uta.png",
    "/team_logos/mem.png",
    "/team_logos/was.png",
    "/team_logos/det.png",
    "/team_logos/cha.png",
];

const ImageCarousel = () => {
  return (
    <div className="image-carousel">
      <div className="carousel-track">
        {logos.map((logo, index) => (
          <div className="carousel-item" key={index}>
              <img src={logo} alt="NBA Team Logo" className="carousel-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;