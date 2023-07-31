import { WebSocketServer } from "ws";
import { TData } from './types'

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (wsData) => {
    // TODO: handle case where typecasting fails (adding `default` to switch doesn't work)
    let data = JSON.parse(wsData.toString()) as TData

    switch(data.type) {
      case "createRoom":
        console.log("creating room")
        break;
      case "joinRoom":
        console.log(`Joining room with id ${data.roomId}`)
        break;
    }
  });
});

wss.on("error", console.error);
wss.on("close", () => console.log("Server closed"));
