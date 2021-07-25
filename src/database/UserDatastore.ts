import { IUserDatastore } from './interface/IUserDatastore'
import { User } from '../entities/user'
export class UserDatastore implements IUserDatastore {
  public async addUser(email: string): Promise<void> {
    const user = new User()
    user.email = email
    user.createdAt = new Date()
    user.updatedAt = new Date()

    await user.save()
  }
}
