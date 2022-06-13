import * as Mongoose from 'mongoose';

export interface IUser extends Mongoose.Document {
  _id: string;
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
