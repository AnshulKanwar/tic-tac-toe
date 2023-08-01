import { v4 as uuid } from "uuid";

export default class Room {
  player1: string | null = null;
  player2: string | null = null;

  turn = null;

  state = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  joinRoom() {
    let playerId = uuid();

    if (this.player1 === null) this.player1 = playerId;
    else if (this.player2 === null) this.player2 = playerId;
    else throw new Error("Room full");

    // once both players have joined
    if (this.player1 !== null && this.player2 !== null) {
      // randomly assign the starting player
      this.turn = Math.random() < 0.5 ? this.player1 : this.player2;
    }
    return playerId;
  }

  private startGame() {}

  // TODO: handle case when a player is not present or has not joined
  playTurn(playerId: string) {
    if (this.turn === playerId) {
      

      this.turn = this.turn === this.player1 ? this.player2 : this.player1;
    }
  }
}
