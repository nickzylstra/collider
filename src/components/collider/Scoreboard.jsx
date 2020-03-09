import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Scoreboard.css'


const Scoreboard = ({ eventEmitter }) => {
  const highScoreRef = useRef(null);
  const currentScoreRef = useRef(null);

  useEffect(() => {
    let timer;
    const highScoreSel = d3.select(highScoreRef.current);
    const currentScoreSel = d3.select(currentScoreRef.current);

    (function startScoreUpdating() {
      function startTimer(elapsed) {
        const highScore = parseInt(highScoreSel.text(), 10);
        const currentScore = Math.floor(elapsed / 10) / 100;
        if (currentScore > highScore) highScoreSel.text(currentScore);
        currentScoreSel.text(currentScore);
      }
      timer = d3.timer(startTimer);
      eventEmitter.on('collision', () => {
        currentScoreSel.text(0);
        timer.restart(startTimer);
      });
    }())

    return function stopScoreUpdating() { timer.stop(); };
  }, [eventEmitter]);

  return (
    <g className="Scoreboard">
      <text x="10" y="20">
        High Score:
      </text>
      <text ref={highScoreRef} x="120" y="20">
        0
      </text>
      <text x="10" y="40">
        Current Score:
      </text>
      <text ref={currentScoreRef} x="120" y="40">
        0
      </text>
    </g>
  )
};

export default Scoreboard;
