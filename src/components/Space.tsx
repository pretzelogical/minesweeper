import { BoardSpaceType, SpaceStates } from "../BoardState";



export function Space({ state, num, id, covered, pos }: BoardSpaceType) {
  return (
    <div
      key={id}
      className={`size-20 mx-1 cursor-pointer rounded-md ${covered ? "bg-zinc-800" : ""}`} >
      <p className="text-white">{state}</p>
    </div>
  )
}
