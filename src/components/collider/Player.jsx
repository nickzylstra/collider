import React from 'react';


const Player = ({ playerRef }) => {
  return (
    <circle
      ref={playerRef}
      className="Player"
      fill="blue"
      r="7"
      transform="translate(50 50)"
    >
    </circle>
  );
};

export default Player;
