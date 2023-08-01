"use client";

import { useRouter } from "next/navigation"
import { TData } from "@/types";
import { WebSocketContext } from "./wsContext";
import { useWebSocket } from '@/hooks/useWebSocket'

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const { ws } = useWebSocket("ws://localhost:8080", (ws, wsData) => {
    const data = JSON.parse(wsData) as TData

    switch(data.type) {
      case "createRoom":
        router.push(`/room?id=${data.roomId}`)
        break;
    }
  })

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}