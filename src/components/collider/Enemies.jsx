import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Enemy from './Enemy';


const Enemies = ({ height, width, enemyCount, playerRef }) => {
  const enemiesContainer = useRef(null);
  const enemySize = 8;

  useEffect(function startEnemyMovement() {
    let timer;
    (function moveEnemies() {
      const svgG = d3.select(enemiesContainer.current);
      const moveTrans = svgG.transition().duration(2000).ease(d3.easePolyInOut)

      function checkCollision(endData, i) {
        const enemy = d3.select(this);
        const {e, f} = this.transform.baseVal.consolidate().matrix
        const [x , y] = [e, f];
        debugger;
        const [endX, endY] = [Math.random() * width, Math.random() * height];
        const interX = d3.interpolateNumber(x, endX);
        const interY = d3.interpolateNumber(y, endY);

        return (t) => {
          // TODO - check collision
          enemy.attr('transform', `translate(${interX(t)} ${interY(t)})`)
        };
      }
  
      svgG.selectAll('.Enemy')
        .transition(moveTrans)
        .tween('checkCollision', checkCollision);
      
      timer = setTimeout(moveEnemies, 2000);
    }())
  
    return () => { clearTimeout(timer); }
  }, [height, width]);

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
              <Enemy key={idx} number={idx * 2} size={enemySize} />
            ))}
          </g>
        );
      })}
    </g>
  );
};

export default Enemies;
