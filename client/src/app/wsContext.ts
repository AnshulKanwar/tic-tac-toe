import { createContext } from "react";

// TODO: create abstraction class for WebSocket
// ex: it returns data when i do `ws.send()`
// can do that by implementing methods like `createRoom()`
export const WebSocketContext = createContext<WebSocket | null>(null)
