import { TData } from "@/types";

export default class GameManager {
  private ws: WebSocket | null = null;

  private createRoomCb: ((roomId: string) => void) | null = null;
  private joinRoomCb: ((playerId: string) => void) | null = null;

  constructor() {
    this.ws = new WebSocket("ws://localhost:8080");
    this.ws.onerror = console.error;

    this.ws.onmessage = (ev) => {
      let data = JSON.parse(ev.data.toString()) as TData;
      console.log(data)
      switch (data.type) {
        case "createRoom":
          if (this.createRoomCb) this.createRoomCb(data.roomId);
          break;

        case "joinRoom":
          if (this.joinRoomCb) this.joinRoomCb(data.playerId);
          break;
      }
    };
  }

  createRoom(cb: (roomId: string) => void) {
    this.createRoomCb = cb;
    this.ws?.send(JSON.stringify({ type: "createRoom" }));
  }

  joinRoom(roomId: string, cb: (playerId: string) => void) {
    this.joinRoomCb = cb
    this.ws?.send(JSON.stringify({ type: "joinRoom", roomId }))
  }
}
