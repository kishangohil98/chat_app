import * as Mongoose from 'mongoose';

export enum GroupType {
  GROUP = 'GROUP',
  DM = 'DM', // Direct Message(one to one chat)
}

export interface IGroup extends Mongoose.Document {
  _id: string;
  users: Mongoose.Types.ObjectId[];
  type: GroupType;
  groupName?: string;
  avatar?: string;
  createdBy: Mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const groupSchema: Mongoose.Schema = new Mongoose.Schema(
  {
    users: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    type: {
      type: Mongoose.Schema.Types.String,
      enum: GroupType,
      required: true,
      default: GroupType.DM,
    },

    groupName: {
      type: Mongoose.Schema.Types.String,
      required: false,
    },

    avatar: {
      type: Mongoose.Schema.Types.String,
      required: false,
    },

    createdBy: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Group = Mongoose.model<IGroup>('Group', groupSchema, 'group');
