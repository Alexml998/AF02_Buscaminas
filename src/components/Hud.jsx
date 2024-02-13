import React from 'react';

import '../styles/hud.scss'

function Hud({ difficulty, level, setLevel, resetGame }) {
  return (
    <div className="hud">
      <select id="difficulty" value={level} onChange={(e) => setLevel(e.target.value)}>
        {difficulty.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

export default Hud;