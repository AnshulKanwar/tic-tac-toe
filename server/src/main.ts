import { WebSocketServer } from "ws";
import { TData } from "./types";
import GameManager from "./gameManager";

const wss = new WebSocketServer({ port: 8080 });
let gameManager = new GameManager();

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (wsData) => {
    // TODO: handle case where typecasting fails (adding `default` to switch doesn't work)
    let data = JSON.parse(wsData.toString()) as TData;

    switch (data.type) {
      case "createRoom":
        const roomId = gameManager.createRoom();
        ws.send(JSON.stringify({ roomId }));
        break;

      case "joinRoom":
        try {
          gameManager.joinRoom(data.roomId);
        } catch (error) {
          ws.send(JSON.stringify({ error }));
        }
        break;

      case "playTurn":
        break;
    }
  });
});

wss.on("error", console.error);
wss.on("close", () => console.log("Server closed"));
