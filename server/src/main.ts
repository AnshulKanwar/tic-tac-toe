import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log(data);
  });
});

wss.on("error", console.error);
wss.on("close", () => console.log("Server closed"));
