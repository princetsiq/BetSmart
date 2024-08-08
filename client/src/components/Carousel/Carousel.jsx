import React, { useState, useEffect, useRef } from 'react';
import Bounce from '../Loading/Bounce';
import './Carousel.scss'; 

const Carousel = () => {
	const trackRef = useRef(null);
	const [logos, setLogos] = useState([]);
	const [revealCarousel, setRevealCarousel] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5002/api/nba/logos')
      .then(response => response.json())
      .then(data => {
        const logosArray = Object.values(data).filter(logo => logo !== null);
        setLogos(logosArray);
				setTimeout(() => {
          setRevealCarousel(true);
        }, 100);
      })
      .catch(error => console.error('Error fetching logos:', error));
  }, []);
	
  useEffect(() => {
    const track = trackRef.current;
    if (track && track.children.length > 0) {
      const firstItemWidth = track.children[0].offsetWidth + 40; 
      track.style.setProperty('--scroll-width', `${firstItemWidth}px`);
    }
  }, [logos]);

  return (
    // <div className="image-carousel">
		// <div className={`image-carousel ${revealCarousel ? 'reveal' : ''}`}>
    //   <div className="carousel-track" ref={trackRef}>
    //     {[...logos, ...logos].map((img, index) => (
    //       <div className="carousel-item" key={index}>
    //         <img src={img} alt="Carousel item" className="carousel-image" />
    //       </div>
    //     ))}
    //   </div>
		// 	<div className="gradient-right" />
		// 	<div className="gradient-left" />
    // </div>

		// <>
    //   {!revealCarousel && (
		// 		<div className="skeleton-loader">
		// 			{/* <Loading /> */}
		// 			<Bounce />
		// 		</div>
    //   )} 
		// 	<div className={`image-carousel ${revealCarousel ? 'reveal' : ''}`}>
		// 		<div className="carousel-track" ref={trackRef}>
		// 			{logos.concat(logos).map((img, index) => (
		// 				<div className="carousel-item" key={index}>
		// 					<img src={img} alt="Carousel item" className="carousel-image" />
		// 				</div>
		// 			))}
		// 		</div>
		//   	<div className="gradient-right" />
		//   	<div className="gradient-left" />
		// 	</div>
    // </>

		<div className="carousel-container">
      <div className={`skeleton-loader ${revealCarousel ? 'fade-out' : 'fade-in'}`}>
        <Bounce />
      </div>
      <div className={`image-carousel ${revealCarousel ? 'fade-in' : 'fade-out'}`}>
        <div className="carousel-track" ref={trackRef}>
          {logos.concat(logos).map((img, index) => (
            <div className="carousel-item" key={index}>
              <img src={img} alt="Carousel item" className="carousel-image" />
            </div>
          ))}
        </div>
        <div className="gradient-right" />
        <div className="gradient-left" />
      </div>
    </div>
  );
};

export default Carousel;
