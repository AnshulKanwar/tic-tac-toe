"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var gameManager_1 = __importDefault(require("./gameManager"));
var wss = new ws_1.WebSocketServer({ port: 8080 });
var gameManager = new gameManager_1.default();
wss.on("connection", function (ws) {
    ws.on("error", console.error);
    ws.on("message", function (wsData) {
        // TODO: handle case where typecasting fails (adding `default` to switch doesn't work)
        var data = JSON.parse(wsData.toString());
        switch (data.type) {
            case "createRoom":
                var roomId = gameManager.createRoom();
                ws.send(JSON.stringify({ type: data.type, roomId: roomId }));
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
wss.on("close", function () { return console.log("Server closed"); });
