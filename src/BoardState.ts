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
  initialize: (width: number, height: number, bombs: number) => void
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
        for (let i = 0; i < height - 1; i++) {
          let row = [];
          for (let j = 0; j < width - 1; j++) {
            row.push(newSpace({ id: `x: ${j}, y: ${i}`, pos: { x: j, y: i } }));
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
