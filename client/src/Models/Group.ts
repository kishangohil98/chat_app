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
  createdBy: User | string;
  createdAt: Date;
  updatedAt: Date;
}

export const getUserFromDmGroup = (group: Group, authUser: User): User => {
  const chatUser = group.users.filter((user) => user._id !== authUser._id)[0];
  return chatUser;
};
