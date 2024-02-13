import { useState } from 'react'
import ApiClient from './util/ApiClient';
import Hud from './components/Hud';
import Board from './components/Board';

function App() {

  const difficulty = ["Facil", "Medio", "Dificil"];
  const [level, setLevel] = useState(difficulty[1]);

  const apiURL = 'http://localhost:9988/' // API en local
  // const apiURL = 'https://quiet-kangaroo-2938f6.netlify.app/';  //API caida
  const [apiClient, setApiClient] = useState(new ApiClient(apiURL));

  const resetGame = () => {
    setApiClient(new ApiClient(apiURL));
  };

  return (
    <main className="game">
      <Hud
        difficulty={difficulty}
        level={level}
        setLevel={setLevel}
        resetGame={resetGame}
      />
      <Board apiClient={apiClient} level={difficulty.indexOf(level)} />
    </main>
  )
}

export default App