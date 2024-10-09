import { BoardSpaceType, SpaceStates } from "../BoardState";
import { useBoardStore } from "../BoardState";



export function Space({ state, num, id, covered, pos }: BoardSpaceType) {
  const click = useBoardStore((state) => state.minesweeper.click);
  return (
    <div
      key={id}
      onClick={() => click(pos.x, pos.y)}
      className={`size-14 mx-1 cursor-pointer ${covered ? "bg-zinc-800" : "bg-zinc-500"}`} >
      <p className="text-white">{`${state === 2 ? 'b' : 'c'} : ${num}`}</p>
    </div>
  )
}
