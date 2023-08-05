"use client"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Copy } from "lucide-react"
import { GameManagerContext } from "@/context/gameManagerContext"
import Board from "@/components/board"

export default function Room() {
  const searchParams = useSearchParams()
  // TODO: get current url using window.location.href
  const id = searchParams.get('id')

  const gameManager = useContext(GameManagerContext)

  const [player, setPlayer] = useState<string | null>(null)
  const [turn, setTurn] = useState<string | null>(null)
  const [isGameStart, setIsGameStart] = useState(false)
  const [state, setState] = useState<string[][] | null>(null)
  const [isGameOver, setIsGameOver] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

  const link = `http://localhost:3000/room?id=${id}`

  if (gameManager) {
    gameManager.onStartGame = () => {
      setIsGameStart(true)
    }

    gameManager.onPlayTurn = (turn: string, state: string[][]) => {
      setTurn(turn)
      setState(state)
    }

    gameManager.onGameOver = (winner, state) => {
      setIsGameOver(true)
      if (winner === "draw") {
        setWinner("draw")
      } else {
        setWinner(winner)
      }
      setState(state)
    }
  }

  useEffect(() => {
    if (id !== null) {
      gameManager?.joinRoom(id, (playerId: string) => {
        setPlayer(playerId)
      })
    }
  }, [gameManager, id])

  return (
    <main className="mt-36 grid place-items-center">
      {isGameStart ? (
        <div className="flex flex-col items-center">
          {isGameOver ? (
            <div className="text-center mb-16 text-xl">
              {winner === "draw" ? "Draw" : winner === player ? "You Won" : "You Lost"}
            </div>
          ) : (
            <div className="text-center mb-16 text-xl">
              {turn === player ? "Your turn" : "Waiting for other players move..."}
            </div>
          )}
          <Board state={state!} />
        </div>
      ) : (
        <div className="text-center">
          <p>Share this link with your friend</p>
          <button onClick={() => navigator.clipboard.writeText(link)} className="flex gap-2 bg-zinc-900 p-3 mx-3 my-5 rounded-md border border-dashed group cursor-pointer border-zinc-600 hover:bg-zinc-800">
            {link}
            <span><Copy className="text-zinc-400 group-hover:text-white" /></span>
          </button>
          <div className="text-zinc-500">Waiting for other player...</div>
          <span>{player}</span>
        </div>
      )}
    </main>
  )
}