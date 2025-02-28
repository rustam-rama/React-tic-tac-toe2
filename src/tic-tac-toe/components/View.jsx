import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeMove, resetGame } from "../actions/gameActions";
import "./View.css";

const View = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const dispatch = useDispatch();

  // Используем отдельные селекторы для каждого значения
  const board = useSelector((state) => state.board);
  const winner = useSelector((state) => state.winner);
  const isDraw = useSelector((state) => state.isDraw);

  const handleReset = () => {
    if (!isGameStarted) return;
    dispatch(resetGame());
    setIsGameStarted(false);
  };

  const handleMove = (index) => {
    setIsGameStarted(true);
    dispatch(makeMove(index));
  };

  return (
    <div className="game-container">
      <h1>Крестики-нолики</h1>
      {winner && <h2 className="winner-message">Победитель: {winner}!</h2>}
      {isDraw && <h2 className="draw-message">Ничья!</h2>}
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleMove(index)}
            disabled={cell || winner || isDraw}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className={`reset-button ${isGameStarted ? "active" : ""}`}
        onClick={handleReset}
      >
        Сброс игры
      </button>
    </div>
  );
};

export default View;
