import { IUserDatastore } from './interface/IUserDatastore'
import { User, IUser } from '../entities/user'
import { injectable } from 'inversify'
import { IUserRegistrationSchema } from '../controllers/UserController/UserRegistrationValidationMiddleware'
import * as cryptoJs from 'crypto-js'

@injectable()
export class UserDatastore implements IUserDatastore {
  public async addUser(body: IUserRegistrationSchema): Promise<IUser> {
    return User.create({
      email: body.email,
      password: cryptoJs.MD5(body.password).toString(),
      firstName: body.firstName,
      lastName: body.lastName,
    })
  }

  public async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<IUser | null> {
    const encryptedPassword = cryptoJs.MD5(password).toString()
    return User.findOne({
      email,
      password: encryptedPassword,
    }).exec()
  }
}
