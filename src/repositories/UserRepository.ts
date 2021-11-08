import { IUserRepository } from './interface/IUserRepository'
import { inject, injectable } from 'inversify'
import { IUserDatastore } from '../database/interface/IUserDatastore'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'
import { IUserRegistrationSchema } from '../controllers/UserController/UserRegistrationValidationMiddleware'
@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(INVERSIFY_TYPES.UserDatastore)
    private userDatastore: IUserDatastore
  ) {}
  public async registerUser(body: IUserRegistrationSchema): Promise<void> {
    await this.userDatastore.addUser(body)
  }

  public async getUser(): Promise<void> {
    // making non-empty block
  }
}
