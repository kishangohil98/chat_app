import {
  IUserRepository,
  IUserWithToken,
  IUserPayload,
} from './interface/IUserRepository'
import { inject, injectable } from 'inversify'
import { IUserDatastore } from '../database/interface/IUserDatastore'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'
import { IUserRegistrationSchema } from '../controllers/UserController/UserRegistrationValidationMiddleware'
import * as JWT from 'jsonwebtoken'
import { IUser } from '../entities/User'
import { NotFoundException } from '../common/exceptions/NotFoundException'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(INVERSIFY_TYPES.UserDatastore)
    private userDatastore: IUserDatastore
  ) {}
  public async registerUser(
    body: IUserRegistrationSchema
  ): Promise<IUserWithToken> {
    const user = await this.userDatastore.addUser(body)

    // Get JWT token
    const token = await this.generateJWToken(user)

    return {
      user,
      token,
    }
  }

  public async getUser(): Promise<void> {
    // making non-empty block
  }

  public async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<IUserWithToken> {
    const user = await this.userDatastore.login({ email, password })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const token = await this.generateJWToken(user)
    return {
      user,
      token,
    }
  }

  private async generateJWToken(user: IUser): Promise<string> {
    const payload: IUserPayload = {
      user,
    }

    return JWT.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1h',
    })
  }
}
