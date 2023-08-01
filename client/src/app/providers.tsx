"use client";

import GameManager from "@/lib/gameManager";
import { GameManagerContext } from "../context/gameManagerContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  let gameManager = new GameManager()

  return (
    <GameManagerContext.Provider value={gameManager}>
      {children}
    </GameManagerContext.Provider>
  )
}