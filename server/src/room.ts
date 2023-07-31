import { v4 as uuid } from "uuid"

export default class Room {
  player1: string | null = null
  player2: string | null = null

  joinRoom() {
    let playerId = uuid()

    if (this.player1 === null)
      this.player1 = playerId
    else if (this.player2 === null)
      this.player2 = playerId
    else
      throw new Error("Room full")

    return playerId
  }
}