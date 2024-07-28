import React from 'react';
import './HomeCard.scss';

const HomeCard = ({ img, title }) => {
  return (
    <div className="home-card-container">
      {img && (
        <img
          src={img}
          alt={`${title} logo`}
          className="home-card-img"
        />
      )}
      {title && (
        <div className="home-card-header">
          <h2 className="home-card-title">{title}</h2>
        </div>
      )}
    </div>
  );
};

export default HomeCard;