import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Bounce from '../Loading/Bounce';
import './Carousel.scss'; 

const Carousel = () => {
	const trackRef = useRef(null);
	const [logos, setLogos] = useState([]);
	const [revealCarousel, setRevealCarousel] = useState(false);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/nba/logos');
        const logosArray = Object.values(response.data).filter(logo => logo !== null);
        setLogos(logosArray);
        setTimeout(() => {
          setRevealCarousel(true);
        }, 100);
      } catch (error) {
        console.error('Error fetching logos:', error);
      }
    };
  
    fetchLogos();
  }, []);
	
  useEffect(() => {
    const track = trackRef.current;
    if (track && track.children.length > 0) {
      const firstItemWidth = track.children[0].offsetWidth + 40; 
      track.style.setProperty('--scroll-width', `${firstItemWidth}px`);
    }
  }, [logos]);

  return (
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
