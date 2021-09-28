import { IUserRepository } from './interface/IUserRepository'
import { inject, injectable } from 'inversify'
import { IUserDatastore } from '../database/interface/IUserDatastore'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'
@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(INVERSIFY_TYPES.UserDatastore)
    private userDatastore: IUserDatastore
  ) {}
  public async registerUser(email: string): Promise<void> {
    console.log('In repositopry', email)
    await this.userDatastore.addUser(email);
  }

  public async getUser(): Promise<void> {
    // making non-empty block
  }
}
