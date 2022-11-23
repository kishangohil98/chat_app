// eslint-disable-next-line no-shadow
export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export interface Message {
  _id: string;
  groupId: string;
  message: string;
  type: MessageType;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;
}
