import React from 'react';


const Enemy = ({ size, number }) => {
  const animeTime = Math.max(number / 5, 1);
  return (
    <ellipse
      rx="0"
      ry="0"
      opacity=".3"
      fill="white"
    >
      <animate
        attributeName="ry"
        dur={`${animeTime}s`}
        values={`${size}; ${size * 3}; ${size}`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="rx"
        dur={`${animeTime}s`}
        values={`${size * 3}; ${size}; ${size * 3}`}
        repeatCount="indefinite"
      />
    </ellipse>
  );
};

export default Enemy;
