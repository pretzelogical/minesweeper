import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

enum SpaceStates {
  Empty,
  Adjacent,
  Mined
}

type BoardSpace = {
  state: SpaceStates,
  num: number
}

type BoardState = {
  board: Array<Array<BoardSpace>>
}

type BoardActions = {
  test: () => void
}

export const useBoardStore = create<BoardState & BoardActions>()(
  immer((set) => ({
    board: [
      [{ state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }],
      [{ state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }],
      [{ state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }],
      [{ state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }, { state: SpaceStates.Empty, num: 0 }],
    ] as Array<Array<BoardSpace>>,
    test: () => { void (0); }
  }))
);
