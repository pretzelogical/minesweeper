import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export enum SpaceStates {
  Empty,
  Adjacent,
  Mined
}

export type BoardSpaceType = {
  state: SpaceStates,
  num: number,
  id: string,
  covered: boolean
  pos: { x: number, y: number }
}

type BoardType = Array<Array<BoardSpaceType>>

type MineSweeperState = {
  board: BoardType,
  initialize: (width: number, height: number, bombs: number) => void,
  click: (x: number, y: number) => void
}

type GameState = {
  minesweeper: MineSweeperState
}

function newSpace({
  state = SpaceStates.Empty,
  num = 0,
  id = '',
  covered = true,
  pos = { x: 0, y: 0 }
}): BoardSpaceType {
  return {
    state,
    num,
    id,
    covered,
    pos
  }
}


export const useBoardStore = create<GameState>()(
  immer((set) => ({
    minesweeper: {
      board: [
        [newSpace({})]
      ] as BoardType,

      initialize: (width: number, height: number, bombs: number): void => {
        const newBoard: BoardType = [];
        for (let by = 0; by <= height - 1; by++) {
          let row = [];
          for (let bx = 0; bx <= width - 1; bx++) {
            row.push(newSpace({ id: `x: ${bx}, y: ${by}`, pos: { x: bx, y: by } }));
          }
          newBoard.push(row);
        }

        let bombsRemaining = bombs;

        while (bombsRemaining > 0) {
          let bx = Math.floor(Math.random() * (width));
          let by = Math.floor(Math.random() * (height));

          if (newBoard[by][bx].state === SpaceStates.Mined) {
            continue;
          }
          newBoard[by][bx].state = SpaceStates.Mined;
          bombsRemaining -= 1;
        }

        const getMineNum = (bx: number, by: number) => {
          if (newBoard[by][bx].state === SpaceStates.Mined) {
            return 0;
          }
          let mineNum = 0;

          // Top row
          for (let oy = -1; oy <= 1; oy++) {
            for (let ox = -1; ox <= 1; ox += 1) {
              if (
                by + oy < 0
                || bx + ox < 0
                || by + oy > newBoard.length - 1
                || bx + ox > newBoard[0].length - 1
              ) {
                continue;
              }
              if (newBoard[by + oy][bx + ox].state === SpaceStates.Mined) {
                mineNum += 1;
              }
            }
          }

          return mineNum;
        }

        for (let by = 0; by <= height - 1; by++) {
          for (let bx = 0; bx <= width - 1; bx++) {
            newBoard[by][bx].num = getMineNum(bx, by);
          }
        }
        set((state) => {
          state.minesweeper.board = newBoard;
        })
      },

      click: (x: number, y: number) => {
        // set((state) => {
        //   state.board = checkBoard(x, y)
        // })
        void 0;
      }
    }
  }))
);
