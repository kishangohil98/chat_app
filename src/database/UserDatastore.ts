import { IUserDatastore } from './interface/IUserDatastore'
import { User } from '../entities/User'
import { injectable } from 'inversify'
import { IUserRegistrationSchema } from '../controllers/UserController/UserRegistrationValidationMiddleware'
import * as cryptoJs from 'crypto-js'

@injectable()
export class UserDatastore implements IUserDatastore {
  public async addUser(body: IUserRegistrationSchema): Promise<void> {
    const user = new User()

    user.email = body.email
    user.password = cryptoJs.AES.encrypt(
      body.password,
      process.env.ENCRYPTION_KEY!
    ).toString()

    await user.save()
  }
}
