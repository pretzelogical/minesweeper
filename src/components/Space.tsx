import { BoardSpaceInterface, SpaceStates } from "../BoardState";
import { useBoardStore } from "../BoardState";

interface SpaceProps extends BoardSpaceInterface {
  width: number
  height: number
}

export function Space({ state, num, id, covered, pos, width, height }: SpaceProps) {
  const click = useBoardStore((state) => state.minesweeper.click);

  const genStyles = () => {
    let className = `size-14 cursor-pointer border-zinc-800 border-b-2 border-r-2 ${covered ? "bg-zinc-500" : "bg-zinc-300"}`;

    if (pos.y === 0) {
      className += " border-t-2";
    }
    if (pos.x === 0) {
      className += " border-l-2";
    }
    if (pos.x === 0 && pos.y === 0) {
      className += " rounded-tl-lg"
    }
    if (pos.x === width - 1 && pos.y === 0) {
      className += " rounded-tr-lg"
    }
    if (pos.x === 0 && pos.y === height - 1) {
      className += " rounded-bl-lg"
    }
    if (pos.x === width - 1 && pos.y === height - 1) {
      className += " rounded-br-lg"
    }
    return className;
  }

  const genDebugText = () => {
    if (import.meta.env.DEV) {
      return `${state === SpaceStates.Mined ? 'b' : 'c'} : ${num}`
    } else {
      return ''
    }
  }
  return (
    <div
      key={id}
      onClick={() => click(pos.x, pos.y)}
      className={genStyles()} >
      <p className="text-white">{genDebugText()}</p>
    </div>
  )
}
