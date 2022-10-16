import * as Mongoose from 'mongoose';
import { winstonLogger } from '../common/logger/WinstonLogger';
// import { IUser } from './interfaces/IUser';
import { generateUserTokens } from '../common/helpers/GenerateToken';

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

const userSchema: Mongoose.Schema = new Mongoose.Schema(
  {
    firstName: {
      type: Mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    lastName: {
      type: Mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: Mongoose.Schema.Types.String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: Mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    accessToken: {
      type: Mongoose.Schema.Types.String,
      trim: true,
    },
    refreshToken: {
      type: Mongoose.Schema.Types.String,
      trim: true,
    },
    avatar: {
      type: Mongoose.Schema.Types.String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
// .pre('save', async function <IUser>(next) {
//   winstonLogger.info(`Running Pre Save hook of Mongoose with User: ${this}`);

//   if (this.isNew) {
//     const { accessToken, refreshToken } = await generateUserTokens(this);
//     this.set('accessToken', accessToken);
//     this.set('refreshToken', refreshToken);
//     winstonLogger.info(
//       `Updating access and refresh token of User in Pre Save hook with User: ${this}`,
//     );
//   }

//   next();
// });

export const User = Mongoose.model<IUser>('User', userSchema, 'user');
