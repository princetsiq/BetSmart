import React, { useState } from "react";
import "./AnimatedButton.css";

function AnimatedButton({ link, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      className={`animated-button ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
}

export default AnimatedButton;
