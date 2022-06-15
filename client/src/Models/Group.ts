import { User } from './User';

// eslint-disable-next-line no-shadow
export enum GroupType {
  GROUP = 'GROUP',
  DM = 'DM', // Direct Message(one to one chat)
}

export interface Group {
  _id: string;
  users: User[];
  type: GroupType;
  groupName?: string;
  avatar?: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}
