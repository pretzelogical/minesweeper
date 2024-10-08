import { BoardSpaceType, SpaceStates } from "../BoardState";



export function Space({ state, num, id, covered, pos }: BoardSpaceType) {
  return (
    <div
      key={id}
      className={`size-14 mx-1 cursor-pointer ${covered ? "bg-zinc-800" : "bg-zinc-500"}`} >
      <p className="text-white">{`${state === 2 ? 'b' : 'c'} : ${num}`}</p>
    </div>
  )
}
