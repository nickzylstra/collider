import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Enemy from './Enemy';


const Enemies = ({ height, width, options, playerRef, eventEmitter }) => {
  const enemiesContainer = useRef(null);
  const { enemyCount, enemySize, enemyInterval } = options;
  
  useEffect(function startEnemyMovement() {
    let timer;
    (function moveEnemies() {
      function getXY(selection) {
        const {e, f} = selection.transform.baseVal.consolidate().matrix;
        return [e, f];
      }

      function checkCollision(playerEl, enemyX, enemyY, enemySize) {
        const distance = (function getDistance(p1, p2) {
          const dx = p1[0] - p2[0];
          const dy = p1[1] - p2[1];
          return Math.sqrt(Math.pow(dx,2) + Math.pow(dy, 2));
        }(getXY(playerEl), [enemyX, enemyY]));

        const isCollision = distance < enemySize;
        return isCollision;
      }

      function updateEnemyCollisionStatus(enemy, isCollision) {
        if (isCollision) {
          enemy.classed('colliding', true);
          eventEmitter.call('collision');
        } else if (enemy.classed('colliding')) {
          enemy.classed('colliding', false);
          enemy.classed('recentlyCollided', true);
          d3.timeout(() => enemy.classed('recentlyCollided', false), 500);
        }
      }

      function moveEnemy() {
        const f = 1.1;
        const [startX , startY] = getXY(this);
        const [endX, endY] = [Math.random() * width * f - width * (f - 1) / 2, Math.random() * height * f - height * (f - 1) / 2];
        const interXofT = d3.interpolateNumber(startX, endX);
        const interYofT = d3.interpolateNumber(startY, endY);
        
        const enemy = d3.select(this);
        return (t) => {
          const [curX, curY] = [interXofT(t), interYofT(t)];
          const isCollision = checkCollision(playerRef.current, curX, curY, enemySize);
          updateEnemyCollisionStatus(enemy, isCollision);
          enemy.attr('transform', `translate(${curX} ${curY})`);
        };
      }
  
      d3.select(enemiesContainer.current).selectAll('.Enemy')
        .transition().duration(enemyInterval).ease(d3.easePolyInOut)
        .tween('moveEnemy', moveEnemy);
      
      timer = d3.timeout(moveEnemies, enemyInterval);
    }())
  
    return () => { timer.stop(); }
  }, [height, width, playerRef, enemySize, enemyInterval, eventEmitter]);

  return (
    <g
      className="Enemies"
      ref={enemiesContainer}
    >
      {Array(enemyCount).fill().map((el, idx) => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return (<Enemy key={idx} number={idx} x={x} y={y} size={enemySize} />);
      })}
    </g>
  );
};

export default Enemies;
