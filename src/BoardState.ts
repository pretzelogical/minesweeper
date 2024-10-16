// import { original, WritableDraft } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
// import { current } from 'immer'

export enum SpaceStates {
  Empty,
  Mined
}

export interface BoardSpaceInterface {
  state: SpaceStates,
  num: number,
  id: string,
  covered: boolean
  pos: { x: number, y: number }
}

type BoardType = Array<Array<BoardSpaceInterface>>

type MineSweeperState = {
  board: BoardType,
  initialize: (width: number, height: number, bombs: number) => void,
  click: (x: number, y: number) => void,
  gameInProgress: boolean
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
}): BoardSpaceInterface {
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
      gameInProgress: false,
      board: [
        [newSpace({})]
      ] as BoardType,

      initialize: (width: number, height: number, bombs: number): void => {
        const newBoard: BoardType = [];
        for (let by = 0; by <= height - 1; by++) {
          const row = [];
          for (let bx = 0; bx <= width - 1; bx++) {
            row.push(newSpace({ id: `x: ${bx}, y: ${by}`, pos: { x: bx, y: by } }));
          }
          newBoard.push(row);
        }

        let bombsRemaining = bombs;

        while (bombsRemaining > 0) {
          const bx = Math.floor(Math.random() * (width));
          const by = Math.floor(Math.random() * (height));

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
          state.minesweeper.gameInProgress = true;
        })
      },

      click: (x: number, y: number) => {
        set((state) => {
          const minesweeper = state.minesweeper;
          const board = minesweeper.board;
          if (!minesweeper.gameInProgress) {
            return;
          }

          if (board[y][x].state === SpaceStates.Mined) {
            state.minesweeper.gameInProgress = false;
            alert('Game Over!');
            return;
          }

          const revealStep = (x: number, y: number) => {
            if (
              y > board.length - 1
              || x > board[0].length - 1
              || y < 0
              || x < 0
            ) {
              return;
            }
            const space = board[y][x]
            if (space.state === SpaceStates.Mined || space.covered === false) {
              return;
            }
            state.minesweeper.board[y][x].covered = false;

            if (space.num > 0) {
              return;
            }


            revealStep(x, y + 1);
            revealStep(x, y - 1);
            revealStep(x + 1, y);
            revealStep(x - 1, y);
          }
          revealStep(x, y);
        })
      }
    }
  }))
);
