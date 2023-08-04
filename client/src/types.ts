interface ICreateRoom {
  type: "createRoom"
  roomId: string
}

interface IJoinRoom {
  type: "joinRoom";
  playerId: string
}

interface IStartGame {
  type: "startGame"
}

interface IPlayTurn {
  type: "playTurn";
  turn: string,
  state: string[][]
}

export type TData = ICreateRoom | IJoinRoom | IStartGame | IPlayTurn