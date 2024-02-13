import { useEffect, useState } from 'react';
import Cell from './Cell';
import BoardLogic from '../util/Board';
import GameOver from './GameOver';

import '../styles/board.scss';

import Victory from './VictoryScreen';

const Board = ({ apiClient, level }) => {
  const [board, setBoard] = useState(null);
  const [remainingMines, setRemainingMines] = useState('');

  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardInfo = await apiClient.getLevel(level);
        const newBoard = new BoardLogic(boardInfo.rows, boardInfo.columns, boardInfo.mines, level);
        setBoard(newBoard);
        setRemainingMines(newBoard.getRemainigMinesCount);
      } catch (error) {
        console.error('Error fetching board:', error);
      }
    };

    fetchBoard();
  }, [apiClient, level]);

  const revealCell = (row, col) => {
    if (board.canBeDefused(row, col)) {
      const updatedBoard = board.defuse(row, col);
      setBoard({ ...updatedBoard });
      setVictory(checkVictory())
    } else {
      const updatedBoard = board.exploded(row, col)
      setBoard({ ...updatedBoard });
      setGameOver(true);
    }
  };

  const updateFlag = (row, col) => {
    board.flag(row, col);
    setRemainingMines(board.getRemainigMinesCount());
    // Actualiza la lógica de la bandera
  };

  const checkVictory = () => {
    // Itera sobre cada celda en el tablero
    for (let row = 0; row < board.columns.length; row++) {
      for (let col = 0; col < board.columns[row].length; col++) {
        const cell = board.columns[row][col];

        // Si la celda no tiene mina, verifica si está desactivada
        if (!cell.hasMine) {
          if (!cell.defused) {
            // Si una celda sin mina no está desactivada, el juego no está ganado
            return false;
          }
        }
      }
    }
    // Si todas las celdas sin mina están desactivadas, el jugador ha ganado
    return true;
  };

  if (!board) {
    return null;
  }

  return (
    <>
      {gameOver && <GameOver />}
      {victory && <Victory />}
      <div className="mine-counter">
        Mines remaining: {remainingMines}
      </div>
      <div className={`board`}>
        {board.columns.map((rows, rowIndex) => (
          <div className="row" key={rowIndex}>
            {rows.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                values={cell}
                updateFlag={updateFlag}
                revealCell={revealCell}
                level={level}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );

};

export default Board;
