import {
  IUserRepository,
  IUserWithToken,
  IUserPayload,
} from './interface/IUserRepository'
import { inject, injectable } from 'inversify'
import { IUserDatastore } from '../database/interface/IUserDatastore'
import { IGroupDatastore } from '../database/interface/IGroupDatastore'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'
import { IUserRegistrationSchema } from '../controllers/UserController/UserRegistrationValidationMiddleware'
import * as JWT from 'jsonwebtoken'
import { IUser, User } from '../entities/User'
import { Group, GroupType } from '../entities/Group'
import { NotFoundException } from '../common/exceptions/NotFoundException'
import * as Mongoose from 'mongoose'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(INVERSIFY_TYPES.UserDatastore)
    private userDatastore: IUserDatastore,
    @inject(INVERSIFY_TYPES.GroupDatastore)
    private groupDatastore: IGroupDatastore
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

  public async getUser(id: string): Promise<IUser | null> {
    return User.findById(id)
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

  public async getListOfUsers(user: IUser): Promise<IUser[]> {
    return []
  }

  public async addUserToChat(user: IUser, userId: string): Promise<void> {
    const groupData = await Group.findOne({
      userIds: [
        Mongoose.Types.ObjectId(user._id),
        Mongoose.Types.ObjectId(userId),
      ],
      type: GroupType.DM,
    })

    if (groupData) {
      return
    }

    const group = new Group()

    group.userIds = [
      Mongoose.Types.ObjectId(user._id),
      Mongoose.Types.ObjectId(userId),
    ]
    group.type = GroupType.DM
    group.createdBy = Mongoose.Types.ObjectId(user._id)

    await this.groupDatastore.addGroup(group)
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
