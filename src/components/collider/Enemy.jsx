import React from 'react';
import './Enemy.css';


const Enemy = ({ size, number, x, y }) => {
  return (
    <g className="Enemy" transform={`translate(${x} ${y})`}>
      {Array(10).fill().map((el, idx) => {
      const animeTime = Math.max(idx * 2 / 5, 1);
      return (
        <ellipse
          key={idx}
          rx="0"
          ry="0"
          opacity=".3"
        >
          <animate
            attributeName="ry"
            dur={`${animeTime}s`}
            values={`${size / 3}; ${size}; ${size / 3}`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="rx"
            dur={`${animeTime}s`}
            values={`${size}; ${size / 3}; ${size}`}
            repeatCount="indefinite"
          />
        </ellipse>
      )})}
    </g>
  );
};

export default Enemy;
