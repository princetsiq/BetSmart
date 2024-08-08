import React, { useEffect, useState, useRef } from 'react'
// import '../ImageCarousel/ImageCarousel.scss'
import './ImageCarousel.scss'


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
  const trackRef = useRef(null);
  // const [logos, setLogos] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5002/api/nba/logos')
  //     .then(response => response.json())
  //     .then(data => {
  //       const logosArray = Object.values(data).filter(logo => logo !== null);
  //       setLogos(logosArray);
  //     })
  //     .catch(error => console.error('Error fetching logos:', error));
  // }, []);

  useEffect(() => {
    const track = trackRef.current;
    const firstItemWidth = track.children[0].offsetWidth + 40.2;
    track.style.setProperty('--scroll-width', `${firstItemWidth}px`);
  }, []);

  // useEffect(() => {
  //   if (logos.length > 0) {
  //     const track = trackRef.current;

  //     const updateTrack = () => {
  //       const firstItemWidth = track.children[0]?.offsetWidth + 10;
  //       // if (firstItemWidth) {
  //       //   track.style.setProperty('--scroll-width', `${firstItemWidth}px`);
  //       // }

  //       // const interval = setInterval(() => {
  //       //   // track.style.transition = 'transform 0.2s linear';
  //       //   // track.style.transform = `translateX(-${firstItemWidth}px)`;

  //       //   setTimeout(() => {
  //       //     track.style.transition = 'none';
  //       //     track.style.transform = 'translateX(0)';
  //       //     track.appendChild(track.children[0]);
  //       //   }, 200);
  //       // }, 2000);

  //       return () => clearInterval(interval);
  //     };

  //     setTimeout(updateTrack, 100);
  //   }
  // }, [logos]);

  return (
    <div className="image-carousel">
      <div className="carousel-track" ref={trackRef}>
        {logos.concat(logos).map((logo, index) => (
          <div className="carousel-item" key={index}>
            <img src={logo} alt="NBA Team Logo" className="carousel-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;