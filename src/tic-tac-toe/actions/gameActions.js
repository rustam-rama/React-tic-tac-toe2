export const MAKE_MOVE = "MAKE_MOVE";
export const RESET_GAME = "RESET_GAME";

export const makeMove = (index) => ({ // делает ход
  type: MAKE_MOVE,
  payload: index,
});

export const resetGame = () => ({ // сброс игры
  type: RESET_GAME,
});
