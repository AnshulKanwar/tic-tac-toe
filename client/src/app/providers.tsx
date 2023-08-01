"use client";

import { WebSocketContext } from "./wsContext";
import { useWebSocket } from '@/hooks/useWebSocket'

export default function Providers({ children }: { children: React.ReactNode }) {
  const { ws } = useWebSocket("ws://localhost:8080", (ws, data) => {
    console.log(data)
  })

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}