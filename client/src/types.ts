interface ICreateRoom {
  type: "createRoom";
  roomId: string;
}

interface IJoinRoom {
  type: "joinRoom";
  playerId: string;
}

interface IStartGame {
  type: "startGame";
}

interface IPlayTurn {
  type: "playTurn";
  turn: string;
  state: string[][];
}

interface IGameOver {
  type: "gameOver";
  result: "win";
  winner: "string";
  state: string[][];
}

interface IGameDraw {
  type: "gameOver";
  result: "draw";
  state: string[][];
}

export type TData =
  | ICreateRoom
  | IJoinRoom
  | IStartGame
  | IPlayTurn
  | IGameDraw
  | IGameOver;
