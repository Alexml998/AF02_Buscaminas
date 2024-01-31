import { useState } from 'react'
import Board from './components/Board';
import ApiClient from './util/ApiClient';

function App() {

  const difficulty = ["Facil", "Medio", "Dificil"];
  const [level, setLevel] = useState(difficulty[1]);

  const apiURL = 'https://quiet-kangaroo-2938f6.netlify.app/';
  const [apiClient, setApiClient] = useState(new ApiClient(apiURL));
  

  return (
    <main className="game">
      <div className="gameInfo">
        <h1 className="title">Buscaminas</h1>
        <select className="difficulty" onChange={(e) => setLevel(e.target.value)} defaultValue={difficulty[1]}>
          {difficulty.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>      
      </div>
      <div className="board">
        <Board apiClient={apiClient} level={difficulty.indexOf(level)} />
      </div>
    </main>
  )
}

export default App