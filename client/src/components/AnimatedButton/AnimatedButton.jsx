import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AnimatedButton.scss";

const AnimatedButton = ({ link, children, onClick, teamId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${link}?teamId=${teamId}`);
  };

   
  
  return (
    <a
      href={link}
      className={`animated-button ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default AnimatedButton;