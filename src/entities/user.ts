import * as Mongoose from 'mongoose'
export interface IUser extends Mongoose.Document {
  _id: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema: Mongoose.Schema = new Mongoose.Schema({
  email: {
    type: Mongoose.Schema.Types.String,
    unique: true,
    required: true,
    trim: true,
  },
  avatar: {
    type: Mongoose.Schema.Types.String,
    required: false,
  },
  createdAt: {
    type: Mongoose.Schema.Types.Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Mongoose.Schema.Types.Date,
    default: Date.now,
    required: true,
  },
})

export const User = Mongoose.model<IUser>('User', userSchema, 'user')
