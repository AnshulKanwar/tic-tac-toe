interface ICreateRoom {
  type: "createRoom"
  roomId: string
}

interface IJoinRoom {
  type: "joinRoom";
  playerId: string
}

export type TData = ICreateRoom | IJoinRoom 