import { useEffect } from "react"
import { useBoardStore } from "../BoardState"


export default function Board() {
  const board = useBoardStore((store) => store.minesweeper.board)
  const initializeBoard = useBoardStore((store) => store.minesweeper.initialize)
  useEffect(() => {
    initializeBoard(4, 6, 3);
  }, [])

  const spaces = board.map((row) => (
    <div className="flex">
      {row.map((space) => (
        <p>{space.state}</p>
      ))}
    </div>
  ))

  return (
    <div className="flex">
      <div className="m-auto">
        {spaces}
      </div>
    </div>
  )
}
