import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Enemy from './Enemy';

const Collider = () => {
  const width = 600;
  const height = 400;
  const enemyCount = 20;
  const enemyContainer = useRef(null);

  useEffect(() => {
    let timer;
    (function moveEnemies() {
      const svgG = d3.select(enemyContainer.current);
      const move = svgG.transition().duration(2000).ease(d3.easePolyInOut)
  
      svgG.selectAll('.Enemy')
        .transition(move)
        .attr('transform', () => `translate(${Math.random() * width} ${Math.random() * height})`);
      
      setTimeout(moveEnemies, 2000);
    }())
  
    return () => { clearTimeout(timer); }
  });

  return (
    <div className="Collider">
      Collider
      <svg
        className="game-container"
        width={width}
        height={height}
      >
        <g
          className="Enemies"
          ref={enemyContainer}
        >
          {Array(enemyCount).fill().map((el, idx) => {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            return <Enemy key={idx} x={x} y={y} number={idx} size={8} />
          })}
        </g>
      </svg>
    </div>
  )
};

export default Collider;
