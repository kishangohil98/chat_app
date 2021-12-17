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
import { Group, IGroup, GroupType } from '../entities/Group'
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

  public async getUser(id: string): Promise<IUser> {
    const user = await User.findById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
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

  /**
   * Add user's entry in group model
   * @param user
   * @param userId
   * @returns
   */
  public async addUserToGroup(user: IUser, userId: string): Promise<void> {
    const findUser = await User.findById(userId)
    if (!findUser) {
      throw new NotFoundException('User not found', 'userId')
    }

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

  /**
   * Get list of user's group and DM
   * @param user
   * @returns {Promise<IGroup[]}
   */
  public async getListOfGroup(user: IUser): Promise<IGroup[]> {
    return Group.find({
      userIds: user.id,
    })
      .populate('user')
      .exec()
  }

  /**
   * Get list of user's group and DM
   * @param user
   * @returns {Promise<IGroup[]}
   */
  public async getNewGroup(user: IUser): Promise<IGroup[]> {
    return Group.find().where('userIds').nin([user.id]).populate('user').exec()
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
