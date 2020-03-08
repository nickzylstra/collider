import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Enemy from './Enemy';


const Enemies = ({ height, width, enemyCount, playerRef, gameRef }) => {
  const enemiesContainer = useRef(null);
  const enemySize = 8;

  useEffect(function startEnemyMovement() {
    let timer;
    (function moveEnemies() {
      const svgG = d3.select(enemiesContainer.current);
      const moveTrans = svgG.transition().duration(2000).ease(d3.easePolyInOut)

      function getXY(selection) {
        const {e, f} = selection.transform.baseVal.consolidate().matrix;
        return [e, f];
      }

      function checkCollision(enemyX, enemyY) {
        const [playerX, playerY] = getXY(playerRef.current);
        if (Math.abs(enemyX - playerX) < enemySize && Math.abs(enemyY - playerY)) {
          console.log('COLLISION!');
          // TODO
          // d3.select(gameRef).style('background-color', 'red')
        } 
      }

      function moveEnemy(endData, i) {
        const [startX , startY] = getXY(this);
        const [endX, endY] = [Math.random() * width, Math.random() * height];
        const interXofT = d3.interpolateNumber(startX, endX);
        const interYofT = d3.interpolateNumber(startY, endY);
        
        const enemy = d3.select(this);
        return (t) => {
          const [curX, curY] = [interXofT(t), interYofT(t)];
          checkCollision(curX, curY);
          enemy.attr('transform', `translate(${curX} ${curY})`);
        };
      }
  
      svgG.selectAll('.Enemy')
        .transition(moveTrans)
        .tween('moveEnemy', moveEnemy);
      
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
