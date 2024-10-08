import { useBoardStore } from "../BoardState"


export default function Board() {
  const board = useBoardStore((store) => store.board)

  const spaces = board.map((row) => (
    <div className="flex">
      {row.map((space) => (
        <p>{space.num}</p>
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
