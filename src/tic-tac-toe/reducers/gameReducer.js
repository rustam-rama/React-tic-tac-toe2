import { MAKE_MOVE, RESET_GAME } from "../actions/gameActions";


export const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // горизонтали
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // вертикали
  [0, 4, 8],
  [2, 4, 6], // диагонали
];

const initialState = {
  board: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  isDraw: false,
};

// Функция проверки победителя
const calculateWinner = (board) => {
  for (let line of winLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_MOVE: {
      if (state.winner || state.board[action.payload]) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[action.payload] = state.xIsNext ? "X" : "O";

      const winner = calculateWinner(newBoard);
      const isDraw = !winner && newBoard.every((cell) => cell !== null);

      return {
        ...state,
        board: newBoard,
        xIsNext: !state.xIsNext,
        winner,
        isDraw,
      };
    }

    case RESET_GAME:
      return initialState;

    default:
      return state;
  }
};
