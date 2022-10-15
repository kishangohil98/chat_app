import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';
import { IUserRepository } from './interface/IUserRepository';
import { IUserDatastore } from '../database/interface/IUserDatastore';
import { IGroupDatastore } from '../database/interface/IGroupDatastore';
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes';
import { IUserRegistrationSchema } from '../controllers/UserController/UserRegistrationValidationMiddleware';
import { IUser } from '../entities/interfaces/IUser';
import { User } from '../entities/User';
import { Group, IGroup, GroupType } from '../entities/Group';
import { NotFoundException } from '../common/exceptions/NotFoundException';
import { generateUserTokens } from '../common/helpers/GenerateToken';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(INVERSIFY_TYPES.UserDatastore)
    private userDatastore: IUserDatastore,
    @inject(INVERSIFY_TYPES.GroupDatastore)
    private groupDatastore: IGroupDatastore,
  ) {}

  public async registerUser(body: IUserRegistrationSchema): Promise<IUser> {
    return this.userDatastore.addUser(body);
  }

  public async getUser(id: string): Promise<IUser | null> {
    const user = await User.findById(id);

    return user;
  }

  /**
   * To get all users in the DB
   */
  public async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }

  public async login({ email, password }: { email: string; password: string }): Promise<IUser> {
    const user = await this.userDatastore.login({ email, password });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.updateUserTokens(user);
  }

  public async getListOfUsers(user: IUser): Promise<IUser[]> {
    return [];
  }

  /**
   * Add user's entry in group model
   * @param user
   * @param userId
   * @returns
   */
  public async addUserToGroup(user: IUser, userId: string): Promise<void> {
    const findUser = await User.findById(userId);
    if (!findUser) {
      throw new NotFoundException('User not found', 'userId');
    }

    const groupData = await Group.findOne({
      userIds: [Mongoose.Types.ObjectId(user._id), Mongoose.Types.ObjectId(userId)],
      type: GroupType.DM,
    });

    if (groupData) {
      return;
    }

    const group = new Group();

    group.users = [Mongoose.Types.ObjectId(user._id), Mongoose.Types.ObjectId(userId)];
    group.type = GroupType.DM;
    group.createdBy = Mongoose.Types.ObjectId(user._id);

    await this.groupDatastore.addGroup(group);
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
      .exec();
  }

  /**
   * Get list of user's group and DM
   * @param user
   * @returns {Promise<IGroup[]}
   */
  public async getNewGroup(user: IUser): Promise<IGroup[]> {
    // eslint-disable-next-line newline-per-chained-call
    return Group.find().where('userIds').nin([user.id]).populate('user').exec();
  }

  public async updateUserTokens(user: IUser): Promise<IUser> {
    const { accessToken, refreshToken } = await generateUserTokens(user);

    await User.updateOne(
      {
        _id: user.id,
      },
      {
        $set: {
          accessToken,
          refreshToken,
        },
      },
    );

    const userWithUpdatedToken = await User.findById(user.id);
    if (!userWithUpdatedToken) {
      throw new NotFoundException('User with tokens not found');
    }
    return userWithUpdatedToken;
  }
}
