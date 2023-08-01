"use client";
import { WebSocketContext } from "@/app/wsContext"
import { useContext } from "react"

export default function CreateRoomButton() {
  const ws = useContext(WebSocketContext);

  const createRoom = () => {
    ws?.send(JSON.stringify({ type: "createRoom" }))
  }

  return (
    <button onClick={createRoom} className='p-3 rounded-xl bg-sky-600 hover:bg-sky-700'>Create Room</button>
  )
}