import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Enemies from './Enemies';
import Player from './Player';
import Scoreboard from './Scoreboard';

const Collider = () => {
  const gameContainer = useRef(null);
  const playerRef = useRef(null);
  const width = 600;
  const height = 400;
  const padding = '20px';
  const enemyCount = 20;

  useEffect(function trackMouseMovement() {
    const player = d3.select(playerRef.current);
    const body = d3.select('body');

    body.on('mousemove', () => {
      const [x, y] = d3.mouse(gameContainer.current)
        .map((c, i) => Math.max(0, Math.min(c, !i ? width : height)));
      player.attr('transform', () => `translate(${x} ${y})`);
    });

    return () => body.on('mousemove', null);
  }, []);

  return (
    <div className="Collider" style={{ padding }}>
      <div>
        Collider
      </div>
      <svg
        ref={gameContainer}
        className="gameContainer"
        width={width}
        height={height}
        style={{ 'backgroundColor': 'black' }}
      >
        <Scoreboard />
        <Player playerRef={playerRef} />
        <Enemies
          playerRef={playerRef}
          gameRef={gameContainer}
          width={width}
          height={height}
          enemyCount={enemyCount}
        />
      </svg>
    </div>
  )
};

export default Collider;
