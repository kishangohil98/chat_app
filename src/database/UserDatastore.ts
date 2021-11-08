import { IUserDatastore } from './interface/IUserDatastore'
import { User } from '../entities/User'
import { injectable } from 'inversify'
@injectable()
export class UserDatastore implements IUserDatastore {
  public async addUser(email: string): Promise<void> {
    const user = new User()
    user.email = email

    await user.save()
  }
}
