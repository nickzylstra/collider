import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Enemies from './Enemies';
import Player from './Player';
import Scoreboard from './Scoreboard';

const eventEmitter = d3.dispatch('collision');

const Collider = () => {
  const gameContainer = useRef(null);
  const playerRef = useRef(null);
  const width = 600;
  const height = 400;
  const padding = '20px';
  const enemyCountInit = 25;
  const enemySizeInit = 24;
  const enemyIntervalInit = 2500;


  const [enemyCount, setEnemyCount] = useState(enemyCountInit);
  const onEnemyCountChange = (e) => setEnemyCount(parseInt(e.target.value || 0, 10));

  const [enemySize, setEnemySize] = useState(enemySizeInit);
  const onEnemySizeChange = (e) => setEnemySize(parseInt(e.target.value || 0, 10));

  const [enemyInterval, setEnemyInterval] = useState(enemyIntervalInit);
  const onEnemyIntervalChange = (e) => setEnemyInterval(parseInt(e.target.value || 1, 10));

  useEffect(function trackMouseMovement() {
    const player = d3.select(playerRef.current);
    const body = d3.select('body');

    body.on('mousemove', function updatePlayerPos() {
      const [x, y] = d3.mouse(gameContainer.current)
        .map((c, i) => Math.max(0, Math.min(c, !i ? width : height)));
      player.attr('transform', () => `translate(${x} ${y})`);
    });

    return () => body.on('mousemove', null);
  }, []);

  const options = { enemyCount, enemySize, enemyInterval };
  return (
    <div className="Collider" style={{ padding }}>
      <div>
        <label>
          Count:
          <input onChange={onEnemyCountChange} value={enemyCount} />
        </label>
        <label>
          Size:
          <input onChange={onEnemySizeChange} value={enemySize} />
        </label>
        <label>
          Speed:
          <select onChange={onEnemyIntervalChange} value={enemyInterval}>
            <option value={enemyIntervalInit / 2}>Fast</option>
            <option value={enemyIntervalInit}>Normal</option>
            <option value={enemyIntervalInit * 2}>Slow</option>
          </select>
        </label>
      </div>
      <svg
        ref={gameContainer}
        className="gameContainer"
        width={width}
        height={height}
        style={{ 'backgroundColor': 'black' }}
      >
        <text x={width - 65} y = "18" fill="white">
          Collider
        </text>
        <Scoreboard eventEmitter={eventEmitter} key={[enemyCount, enemySize]}/>
        <Player playerRef={playerRef} />
        <Enemies
          playerRef={playerRef}
          gameRef={gameContainer}
          width={width}
          height={height}
          options={options}
          eventEmitter={eventEmitter}
        />
      </svg>
    </div>
  )
};

export default Collider;
