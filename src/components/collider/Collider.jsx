import React, { useState, useRef, useEffect } from 'react';
import Enemies from './Enemies';

const Collider = () => {
  const width = 600;
  const height = 400;
  const enemyCount = 20;

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });



  return (
    <div className="Collider">
      Collider
      <svg
        className="game-container"
        width={width}
        height={height}
        style={{ 'backgroundColor': 'black' }}
      >
        <Enemies
          width={width}
          height={height}
          enemyCount={enemyCount}
        />
      </svg>
    </div>
  )
};

export default Collider;
