import { useEffect } from "react"
import { useBoardStore } from "../BoardState"
import { Space } from "./Space"


export default function Board() {
  const board = useBoardStore((store) => store.minesweeper.board)
  const initializeBoard = useBoardStore((store) => store.minesweeper.initialize)
  useEffect(() => {
    initializeBoard(8, 10, 5);
  }, [initializeBoard])

  const spaces = board.map((row) => (
    <div
      className="flex"
      key={`r ${row[0].id}`}
    >
      {row.map((space) => (
        <Space {...space} width={board[0].length} height={board.length} key={space.id} />
      ))}
    </div>
  ))

  return (
    <div className="flex h-full">
      <div className="m-auto">
        {spaces}
      </div>
    </div>
  )
}
