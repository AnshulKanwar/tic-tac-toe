import { GameManagerContext } from "@/context/gameManagerContext"
import { useContext } from "react"

interface BoardProps {
  state: string[][]
}

export default function Board({ state }: BoardProps) {
  const gameManager = useContext(GameManagerContext)

  return (
    <div>
      {state.map((row, rowIdx) => (
        <div key={rowIdx} className="flex border-b last:border-none">
          {row.map((tile, colIdx) => (
            <button
              key={colIdx}
              onClick={() => gameManager?.playTurn(rowIdx, colIdx)}
              className="w-20 h-20 border-r last:border-none"
            >
              {tile === "-" ? null : tile}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}