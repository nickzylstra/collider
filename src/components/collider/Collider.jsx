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
        <Enemy x={100} y={100} size={10} />
        <Enemy x={200} y={200} size={10} />
      </svg>
    </div>
  )
};

export default Collider;
