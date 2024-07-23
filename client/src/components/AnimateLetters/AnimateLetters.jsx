import React, { useEffect, useRef } from 'react';
import './AnimateLetters.scss'

const AnimateLetters = ({ letterClass, strArray, idx }) => {
  return (
    <span>
      {strArray.map((char, i) => (
        <span key={i} className={`${letterClass} _${i + idx}`}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default AnimateLetters;