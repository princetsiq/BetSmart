import React, { useEffect } from 'react';
import basketballImage from '../../assets/logos/basketball.png';
import './Bounce.scss';

const Bounce = () => {
  useEffect(() => {
    const ball = document.querySelector('.ball');
		const shadow = document.querySelector('.shadow');
    const container = document.querySelector('.bounce-container');

    let position = 0;
    let direction = 1;
		let rotation = 0;
    const speed = 5;
    const gravity = 1;
    let yPosition = 0;
    let ySpeed = 0;
    const yFriction = 0.8;

    const animate = () => {
      // Horizontal movement
      position += speed * direction;
			rotation += speed;

      if (position >= container.clientWidth) {
        position = -ball.clientWidth; // Move ball out of view on the left
        yPosition = 0; // Reset vertical position
        ySpeed = 0; // Reset vertical speed
				rotation = 0; // Reset rotation speed
      }
      ball.style.left = `${position}px`;
			ball.style.transform = `rotate(${rotation}deg)`;

      // Vertical bouncing
      ySpeed += gravity;
      yPosition += ySpeed;
      if (yPosition > container.clientHeight - ball.clientHeight) {
        yPosition = container.clientHeight - ball.clientHeight;
        ySpeed = -ySpeed * yFriction;
      }

      ball.style.top = `${yPosition}px`;
			const scaleFactor = 1 + (container.clientHeight - yPosition - ball.clientHeight) / container.clientHeight;
      shadow.style.transform = `translateX(${position}px) scale(${scaleFactor})`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="bounce-container">
      <div className="ball">
        <img src={basketballImage} alt="Basketball" className="ball-image"/>
      </div>
      <div className="shadow" />
    </div>
  );
};

export default Bounce;