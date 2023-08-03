interface ICreateRoom {
  type: "createRoom";
}

interface IJoinRoom {
  type: "joinRoom";
  roomId: string;
}

interface IPlayTurn {
  type: "playTurn";
  roomId: string;
  playerId: string;
  move: { row: number; column: number };
}

export type TData = ICreateRoom | IJoinRoom | IPlayTurn;
