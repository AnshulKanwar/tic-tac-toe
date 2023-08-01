import { createContext } from "react";
import GameManager from "@/lib/gameManager";

export const GameManagerContext = createContext<GameManager | null>(null)
