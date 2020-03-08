import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Enemy from './Enemy';

const Collider = () => {
  const width = 600;
  const height = 400;
  const enemyCount = 20;


  const gameContainer = useRef(null);

  return (
    <div className="Collider">
      Collider
      <svg
        ref={gameContainer}
        className="game-container"
        width={width}
        height={height}
      >
        {Array(enemyCount).fill().map((el, idx) => {
          const x = Math.floor(Math.random() * width);
          const y = Math.floor(Math.random() * height);
          return <Enemy x={x} y={y} number={idx} size={10} />
        })}
      </svg>
    </div>
  )
};

export default Collider;
