import { IUserRepository } from './interface/IUserRepository'
import { inject, injectable } from 'inversify'
// import { UserDatastore } from '../database/UserDatastore';
// import { IUserDatastore } from '../database/interface/IUserDatastore';
@injectable()
export class UserRepository implements IUserRepository {

  public async registerUser(email: string): Promise<void> {
    // await this.userDatastore.addUser(email);
  }

  public async getUser(): Promise<void> {
      // making non-empty block
  }
}
