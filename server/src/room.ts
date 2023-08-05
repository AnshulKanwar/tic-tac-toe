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
  playTurn(playerId: string, move: { rowIdx: number; colIdx: number }) {
    if (
      this.turn?.id == playerId &&
      this.state[move.rowIdx][move.colIdx] == "-"
    ) {
      if (this.turn?.id == this.player1?.id) {
        this.state[move.rowIdx][move.colIdx] = "X";
        this.turn = this.player2;
      } else if (this.turn?.id == this.player2?.id) {
        this.state[move.rowIdx][move.colIdx] = "O";
        this.turn = this.player1;
      }

      const result = this.checkWin();
      if (result) {
        if (result === "draw") {
          this.player1?.ws.send(
            JSON.stringify({
              type: "gameOver",
              result,
              state: this.state,
            })
          );
          this.player2?.ws.send(
            JSON.stringify({
              type: "gameOver",
              result,
              state: this.state,
            })
          );
        } else {
          this.player1?.ws.send(
            JSON.stringify({
              type: "gameOver",
              result: "win",
              winner: result.id,
              state: this.state,
            })
          );
          this.player2?.ws.send(
            JSON.stringify({
              type: "gameOver",
              result: "win",
              winner: result.id,
              state: this.state,
            })
          );
        }
      } else {
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

  private checkWin(): Player | "draw" | null {
    // check row
    this.state.forEach((row) => {
      if (row[0] === row[1] && row[1] === row[2] && row[2] === "X") {
        return this.player1;
      } else if (row[0] === row[1] && row[1] === row[2] && row[2] === "O") {
        return this.player2;
      }
    });

    // check column
    for (let i = 0; i <= 2; i++) {
      if (
        this.state[0][i] === this.state[1][i] &&
        this.state[1][i] === this.state[2][i]
      ) {
        if (this.state[0][i] === "X") {
          return this.player1;
        } else if (this.state[0][i] === "O") {
          return this.player2;
        }
      }
    }

    // check diagonal
    if (this.state[0][0] === this.state[1][1] && this.state[1][1] === this.state[2][2]) {
      if (this.state[0][0] === "X") {
        return this.player1;
      } else if (this.state[0][0] === "O") {
        return this.player2;
      }
    }

    if (this.state[0][2] === this.state[1][1] && this.state[1][1] === this.state[2][0]) {
      if (this.state[0][2] === "X") {
        return this.player1;
      } else if (this.state[0][2] === "O") {
        return this.player2;
      }
    }

    let isDraw = true
    this.state.forEach(row => {
      if (row.includes("-")) {
        isDraw = false
      }
    })

    return isDraw ? "draw" : null;
  }
}
