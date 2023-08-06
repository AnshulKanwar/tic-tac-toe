import { TData } from "@/types";

export default class GameManager {
  private ws: WebSocket | null = null;

  private createRoomCb: ((roomId: string) => void) | null = null;
  private joinRoomCb: ((playerId: string) => void) | null = null;
  onStartGame: (() => void) | null = null;
  onPlayTurn: ((trun: string, state: string[][]) => void) | null = null;
  onGameOver: ((winner: string, state: string[][]) => void) | null = null;

  roomId: string | null = null;
  playerId: string | null = null;

  constructor() {
    this.ws = new WebSocket("wss://tic-tac-toe-emev.onrender.com/");
    this.ws.onerror = console.error;

    this.ws.onmessage = (ev) => {
      let data = JSON.parse(ev.data.toString()) as TData;
      console.log(data);
      switch (data.type) {
        case "createRoom":
          if (this.createRoomCb) this.createRoomCb(data.roomId);
          break;

        case "joinRoom":
          if (this.joinRoomCb) {
            this.joinRoomCb(data.playerId);
            this.playerId = data.playerId;
          }
          break;

        case "startGame":
          if (this.onStartGame) this.onStartGame();
          break;

        case "playTurn":
          if (this.onPlayTurn) this.onPlayTurn(data.turn, data.state);
          break;

        case "gameOver":
          if (this.onGameOver) {
            if (data.result === "win") {
              this.onGameOver(data.winner, data.state)
            } else if (data.result === "draw") {
              this.onGameOver("draw", data.state);
            }
          }
      }
    };
  }

  createRoom(cb: (roomId: string) => void) {
    this.createRoomCb = cb;
    this.ws?.send(JSON.stringify({ type: "createRoom" }));
  }

  joinRoom(roomId: string, cb: (playerId: string) => void) {
    this.joinRoomCb = cb;
    this.roomId = roomId;
    this.ws?.send(JSON.stringify({ type: "joinRoom", roomId }));
  }

  playTurn(rowIdx: number, colIdx: number) {
    this.ws?.send(
      JSON.stringify({
        type: "playTurn",
        roomId: this.roomId,
        playerId: this.playerId,
        move: { rowIdx, colIdx },
      })
    );
  }
}
