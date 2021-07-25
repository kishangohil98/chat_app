import * as mongoose from 'mongoose'
export interface IUser extends mongoose.Document {
  _id: string
  email: string
  createdAt: Date
  updatedAt: Date
}

const userSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
    trim: true,
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    required: false,
  },
})

export const User = mongoose.model<IUser>('User', userSchema, 'user')
