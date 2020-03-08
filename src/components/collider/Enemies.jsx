import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Enemy from './Enemy';


const Enemies = ({ height, width, enemyCount, playerRef }) => {
  const enemiesContainer = useRef(null);
  const enemySize = 8;

  useEffect(() => {
    let timer;
    (function moveEnemies() {
      const svgG = d3.select(enemiesContainer.current);
      const move = svgG.transition().duration(2000).ease(d3.easePolyInOut)
  
      svgG.selectAll('.Enemy')
        .transition(move)
        .attr('transform', () => `translate(${Math.random() * width} ${Math.random() * height})`);
      
      timer = setTimeout(moveEnemies, 2000);
    }())
  
    return () => { clearTimeout(timer); }
  });

  return (
    <g
      className="Enemies"
      ref={enemiesContainer}
    >
      {Array(enemyCount).fill().map((el, idx) => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return (
          <g key={idx} className="Enemy" transform={`translate(${x} ${y})`}>
            {Array(10).fill().map((el, idx) => (
              <Enemy key={idx} x={x} y={y} number={idx * 2} size={enemySize} />
            ))}
          </g>
        );
      })}
    </g>
  );
};

export default Enemies;
