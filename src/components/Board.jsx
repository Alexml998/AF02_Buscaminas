import { useEffect, useState } from 'react';
import Cell from './Cell';
import BoardLogic from '../util/Board';

import '../styles/board.scss';

const Board = ({ apiClient, level }) => {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardInfo = await apiClient.getLevel(level);
        const newBoard = new BoardLogic(boardInfo.rows, boardInfo.columns, boardInfo.mines, level);
        setBoard(newBoard);
      } catch (error) {
        console.error('Error fetching board:', error);
      }
    };

    fetchBoard();
  }, [apiClient, level]);

  const revealCell = (row, col) => {
    if (board.canBeDefused(row, col)) {
      const updatedBoard = board.defuse(row, col);
      setBoard(updatedBoard);
    }
  };

  const updateFlag = (row, col) => {
    // Actualiza la lógica de la bandera
  };

  return board ? (
    board.columns.map((rows, rowIndex) => (
      <div className="row" key={rowIndex}>
        {rows.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            values={cell}
            updateFlag={updateFlag}
            revealCell={revealCell}
          />
        ))}
      </div>
    ))        
  ) : null;
};

export default Board;
