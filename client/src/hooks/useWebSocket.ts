export const useWebSocket = (url: string, onMessage: (webSocket: WebSocket, data: string) => void) => {
  const ws = new WebSocket(url)

  ws.onerror = console.error
  ws.onmessage = (ev) => onMessage(ws, ev.data.toString())

  return { ws }
}