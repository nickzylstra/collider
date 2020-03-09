import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Scoreboard.css'


const Scoreboard = () => {
  const highScoreRef = useRef(null);
  const currentScoreRef = useRef(null);

  useEffect(() => {
    let timer;
    (function updateScore() {
      timer = d3.timer((elapsed) => {
        const highScoreSel = d3.select(highScoreRef.current);
        const highScore = parseInt(highScoreSel.text(), 10);
        const currentScore = Math.floor(elapsed / 10) / 100;
        if (currentScore > highScore) highScoreSel.text(currentScore);
        d3.select(currentScoreRef.current).text(currentScore);
      });
    }())

    return () => { timer.stop(); };
  }, []);

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
