import { createSlice } from "@reduxjs/toolkit";

interface Line {
  [index: number]: string;
}
const initialState = {
  board: Array.from({ length: 5 as number }, () =>
    Array.from({ length: 5 as number }, () => "")
  ) as Line[],
  isStarted: false,
  isLose: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state, action) => {
      if (state.isStarted) {
        return state;
      }

      const difficulty = document.getElementById("difficulty")!.value;
      let mines;
      let size;

      switch (difficulty) {
        case "easy":
          mines = 5;
          size = 5;
          break;
        case "medium":
          mines = 20;
          size = 10;
          break;
        case "hard":
          mines = 30;
          size = 15;
          break;
      }

      for (let i = 0; i < mines; i++) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);

        if (action.payload.lineIndex === x && action.payload.cellIndex === y) {
          i--;
          continue;
        }

        if (state.board[x][y] === "*") {
          i--;
          continue;
        }

        state.board[x][y] = "*";
      }

      state.isStarted = true;
    },

    checkWin: (state, action) => {
      if (!state.isStarted) {
        return state;
      }

      if (
        state.board[action.payload.lineIndex][action.payload.cellIndex] === "*"
      ) {
        state.isLose = true;
      }
    },

    checkMinesAround: (state, action) => {
      if (!state.isStarted) {
        return state;
      }

      let count = 0;

      const top = action.payload.lineIndex - 1;
      const bottom = action.payload.lineIndex + 1;
      const left = action.payload.cellIndex - 1;
      const right = action.payload.cellIndex + 1;

      const topCell = state.board[top]?.[action.payload.cellIndex];
      const bottomCell = state.board[bottom]?.[action.payload.cellIndex];
      const leftCell = state.board[action.payload.lineIndex]?.[left];
      const rightCell = state.board[action.payload.lineIndex]?.[right];
      const topRightCell = state.board[top]?.[right];
      const topLeftCell = state.board[top]?.[left];
      const bottomRightCell = state.board[bottom]?.[right];
      const bottomLeftCell = state.board[bottom]?.[left];

      if (topCell === "*") {
        count++;
      }
      if (bottomCell === "*") {
        count++;
      }
      if (leftCell === "*") {
        count++;
      }
      if (rightCell === "*") {
        count++;
      }
      if (topRightCell === "*") {
        count++;
      }
      if (topLeftCell === "*") {
        count++;
      }
      if (bottomRightCell === "*") {
        count++;
      }
      if (bottomLeftCell === "*") {
        count++;
      }

      if (count === 0) {
        return state;
      }

      if (
        state.board[action.payload.lineIndex][action.payload.cellIndex] !== "*"
      ) {
        state.board[action.payload.lineIndex][action.payload.cellIndex] =
          count.toString();
      }
    },

    resetGame: (state) => {
      const difficulty = document.getElementById("difficulty")!.value;
      let size;

      switch (difficulty) {
        case "easy":
          size = 5;
          break;
        case "medium":
          size = 10;
          break;
        case "hard":
          size = 15;
          break;
      }

      const board = document.getElementById("board");

      for (const childLine of board!.children) {
        for (const childCell of childLine.children) {
          childCell.className = "cell cover";
        }
      }

      state.isStarted = false;
      state.isLose = false;

      state.board = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => "")
      ) as Line[];
    },
  },
});

export default gameSlice.reducer;
export const { startGame, checkWin, checkMinesAround, resetGame } =
  gameSlice.actions;
