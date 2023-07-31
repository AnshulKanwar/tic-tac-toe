interface ICreateRoom {
  type: "createRoom";
}

interface IJoinRoom {
  type: "joinRoom";
  roomId: string;
}

export type TData = ICreateRoom | IJoinRoom
