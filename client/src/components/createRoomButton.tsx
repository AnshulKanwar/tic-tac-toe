"use client";
import { useContext } from "react"
import { useRouter } from "next/navigation";
import { GameManagerContext } from "@/context/gameManagerContext"

export default function CreateRoomButton() {
  const gameManager = useContext(GameManagerContext);
  const router = useRouter()

  const createRoom = () => {
    gameManager?.createRoom((roomId) => {
      router.push(`/room?id=${roomId}`)
    })
  }

  return (
    <button onClick={createRoom} className='p-3 rounded-xl bg-sky-600 hover:bg-sky-700'>Create Room</button>
  )
}