import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Enemies from './Enemies';
import Player from './Player';

const Collider = () => {
  const gameContainer = useRef(null);
  const playerRef = useRef(null);
  const width = 600;
  const height = 400;
  const padding = '20px';
  const enemyCount = 20;

  useEffect(() => {
    const body = d3.select('body');
    const player = d3.select(playerRef.current);
    body.on('mousemove', function listen() {
      const [x, y] = d3.mouse(gameContainer.current)
        .map((c, i) => Math.max(0, Math.min(c, !i ? width : height)));
      player.attr('transform', () => `translate(${x} ${y})`);
    });
    return () => body.on('mousemove', null);
  });

  return (
    <div className="Collider" style={{ padding }}>
      <div>
        Collider
      </div>
      <svg
        ref={gameContainer}
        className="game-container"
        width={width}
        height={height}
        style={{ 'backgroundColor': 'black' }}
      >
        <Player playerRef={playerRef} />
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
