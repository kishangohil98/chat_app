import * as Mongoose from 'mongoose';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export interface IMessage extends Mongoose.Document {
  _id: string;
  groupId: Mongoose.Types.ObjectId;
  message: string;
  type: MessageType;
  senderId: Mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema: Mongoose.Schema = new Mongoose.Schema(
  {
    groupId: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Group',
    },

    message: {
      type: Mongoose.Schema.Types.String,
      required: true,
    },

    type: {
      type: Mongoose.Schema.Types.String,
      enum: MessageType,
      required: true,
    },

    senderId: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Message = Mongoose.model<IMessage>('Message', messageSchema, 'message');
