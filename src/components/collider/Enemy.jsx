import React from 'react';


const Enemy = ({ x, y, size }) => {
  return (
    <g
      id="R1"
      transform={`translate(${x} ${y})`}
    > 
      <ellipse
       rx="0"
       ry="0"
       opacity=".3"
      >
        <animate
          attributeName="ry"
          dur="3s"
          values={`${size}; ${size * 3}; ${size}`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="rx"
          dur="3s"
          values={`${size}; ${size * 3}; ${size}`}
          repeatCount="indefinite"
        />
      </ellipse>
    </g>
  );
};

export default Enemy;
