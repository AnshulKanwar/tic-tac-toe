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
        ws.send(JSON.stringify({ type: data.type, roomId }));
        break;

      case "joinRoom":
        gameManager.joinRoom(data.roomId, ws);
        break;

      case "playTurn":
        gameManager.playTurn(data.roomId, data.playerId, data.move);
        break;
    }
  });
});

wss.on("error", console.error);
wss.on("close", () => console.log("Server closed"));
