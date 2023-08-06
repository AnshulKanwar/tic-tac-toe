"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var room_1 = __importDefault(require("./room"));
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.rooms = {};
    }
    GameManager.prototype.createRoom = function () {
        var roomId = (0, uuid_1.v4)();
        var room = new room_1.default();
        this.rooms[roomId] = room;
        return roomId;
    };
    GameManager.prototype.joinRoom = function (roomId, ws) {
        if (this.rooms[roomId]) {
            this.rooms[roomId].joinRoom(ws);
        }
        else {
            throw Error("Room does not exist");
        }
    };
    GameManager.prototype.playTurn = function (roomId, playerId, move) {
        this.rooms[roomId].playTurn(playerId, move);
    };
    return GameManager;
}());
exports.default = GameManager;
