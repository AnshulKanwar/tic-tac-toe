import { v4 as uuid } from "uuid";
import { WebSocket } from "ws";

interface Player {
  id: string;
  ws: WebSocket;
}

export default class Room {
  player1: Player | null = null;
  player2: Player | null = null;

  private turn: Player | null = null;

  private state = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  joinRoom(ws: WebSocket) {
    let playerId = uuid();

    if (this.player1 === null) this.player1 = { id: playerId, ws };
    else if (this.player2 === null) this.player2 = { id: playerId, ws };
    else ws.send(JSON.stringify({ type: "error", error: "Room Full" }));

    ws.send(JSON.stringify({ type: "joinRoom", playerId }));

    // once both players have joined
    if (this.player1 !== null && this.player2 !== null) {
      // start the game
      this.startGame();
    }
  }

  private startGame() {
    this.player1?.ws.send(JSON.stringify({ type: "startGame" }));
    this.player2?.ws.send(JSON.stringify({ type: "startGame" }));

    // choose a random starting player
    this.turn = Math.random() < 0.5 ? this.player1 : this.player2;
    this.player1?.ws.send(
      JSON.stringify({
        type: "playTurn",
        turn: this.turn?.id,
        state: this.state,
      })
    );
    this.player2?.ws.send(
      JSON.stringify({
        type: "playTurn",
        turn: this.turn?.id,
        state: this.state,
      })
    );
  }

  // TODO: handle case when a player is not present or has not joined
  playTurn(playerId: string, move: { row: number; column: number }) {
    if (this.turn?.id == playerId) {
      if (this.turn?.id == this.player1?.id) {
        this.state[move.row][move.column] = "X";
        this.turn = this.player2;
      } else if (this.turn?.id == this.player2?.id) {
        this.state[move.row][move.column] = "O";
        this.turn = this.player1;
      }

      this.player1?.ws.send(
        JSON.stringify({
          type: "playTurn",
          turn: this.turn?.id,
          state: this.state,
        })
      );
      this.player2?.ws.send(
        JSON.stringify({
          type: "playTurn",
          turn: this.turn?.id,
          state: this.state,
        })
      );
    }
  }
}
