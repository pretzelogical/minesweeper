import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

enum SpaceStates {
  Empty,
  Adjacent,
  Mined
}

type BoardSpaceType = {
  state: SpaceStates,
  num: number
}

type BoardType = Array<Array<BoardSpaceType>>

type MineSweeperState = {
  board: BoardType,
  initialize: (width: number, height: number, bombs: number) => void
}

type GameState = {
  minesweeper: MineSweeperState
}


export const useBoardStore = create<GameState>()(
  immer((set) => ({
    minesweeper: {
      board: [
        [{ state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }],
        [{ state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }],
        [{ state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }],
        [{ state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }],
      ] as BoardType,
      initialize: (width: number, height: number, bombs: number): void => {
        const newBoard: BoardType = [];
        for (let i = 0; i < height - 1; i++) {
          let row = [];
          for (let j = 0; j < width - 1; j++) {
            row.push({ state: SpaceStates.Empty, num: 0 });
          }
          newBoard.push(row);
        }

        let bombsRemaining = bombs;

        while (bombsRemaining > 0) {
          let bx = Math.floor(Math.random() * (width - 1));
          let by = Math.floor(Math.random() * (height - 1));

          if (newBoard[by][bx].state === SpaceStates.Mined) {
            continue;
          }
          newBoard[by][bx].state = SpaceStates.Mined;
          bombsRemaining -= 1;
        }
        set((state) => {
          state.minesweeper.board = newBoard;
        })
      }
    }
  }))
);
