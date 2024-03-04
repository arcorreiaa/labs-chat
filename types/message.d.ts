export interface Message {
  createdAt: ICreatedAt;
  profileUrl: string;
  senderName: string;
  text: string;
  userId: string;
}

export interface ICreatedAt {
  nanoseconds?: number;
  seconds?: number;
}
