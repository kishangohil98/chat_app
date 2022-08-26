import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';
import { IGroupRepository } from './interface/IGroupRepository';
import { IGroupDatastore } from '../database/interface/IGroupDatastore';
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes';
import { IUser } from '../entities/interfaces/IUser';
import { Group, GroupType, IGroup } from '../entities/Group';
import { User } from '../entities/User';
import { IJoinGroupSchema } from '../controllers/GroupController/JoinGroupValidationMiddleware';

@injectable()
export class GroupRepository implements IGroupRepository {
  constructor(
    @inject(INVERSIFY_TYPES.GroupDatastore)
    private groupDatastore: IGroupDatastore,
  ) {}

  public async getAllGroups(): Promise<IGroup[]> {
    const groups = await this.groupDatastore.getAllGroups();
    return groups;
  }

  public async getGroupsOfUser(user: IUser): Promise<IGroup[]> {
    return this.groupDatastore.getGroupsOfUser(user);
  }

  public async getNewGroups(user: IUser): Promise<{
    users: IUser[];
    groups: IGroup[];
  }> {
    const newUsers = await this.getNewDmUsers(user);
    // New Groups
    const newGroups = await this.groupDatastore.getNewGroups(user);
    return {
      users: newUsers,
      groups: newGroups,
    };
  }

  public async joinNewGroup(user: IUser, body: IJoinGroupSchema): Promise<void> {
    if (body.groupType === GroupType.DM && body.userId) {
      const group = new Group();
      group.users = [Mongoose.Types.ObjectId(user._id), Mongoose.Types.ObjectId(body.userId)];
    }
  }

  private async getNewDmUsers(user: IUser): Promise<IUser[]> {
    const dmUsers = await this.groupDatastore.getUserDmList(user);

    const connectedUsers = dmUsers.reduce(
      (result, current) => [...result, ...current.users.map((id) => id.toString())],
      [],
    );

    const dmUserIds: string[] = [];
    connectedUsers.map((id) => {
      if (!dmUserIds.includes(id)) {
        dmUserIds.push(id);
      }
      return undefined;
    });

    // New DM users
    return User.find({
      _id: {
        $nin: dmUserIds,
      },
    }).select('firstName lastName email avatar');
  }
}
