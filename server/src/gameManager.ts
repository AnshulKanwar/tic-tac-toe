import { v4 as uuid } from "uuid";
import Room from "./room";

export default class GameManager {
  rooms: { [id: string]: Room } = {};

  createRoom() {
    const roomId = uuid()
    const room = new Room()
    this.rooms['roomId'] = room

    return roomId
  }

  joinRoom(roomId: string) {
    let playerId = this.rooms[roomId].joinRoom()
    return playerId
  }

  playTurn(roomId: string, playerId: string) {
    this.rooms[roomId].playTurn(playerId)
  }
}
