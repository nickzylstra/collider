import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Scoreboard.css'


const Scoreboard = () => {
  const highScoreRef = useRef(null);
  const currentScoreRef = useRef(null);

  useEffect(() => {
    const currentScore = d3.select(currentScoreRef.current);
    const timer = d3.timer((elapsed) => {
      currentScore.text(`Current Score: ${Math.floor(elapsed / 10) / 100}`)
    });

    return () => { timer.stop(); };
  }, []);

  return (
    <g className="Scoreboard">
      <text ref={highScoreRef} x="10" y="20">
        High Score
      </text>
      <text ref={currentScoreRef} x="10" y="40">
        Current Score
      </text>
    </g>
  )
};

export default Scoreboard;
