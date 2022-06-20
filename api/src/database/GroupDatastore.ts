import { injectable } from 'inversify';
import { IGroupDatastore } from './interface/IGroupDatastore';
import { Group, GroupType, IGroup } from '../entities/Group';
import { IUser } from '../entities/interfaces/IUser';

@injectable()
export class GroupDatastore implements IGroupDatastore {
  public async addGroup(group: IGroup): Promise<void> {
    await group.save();
  }

  /**
   * Get all available groups
   * @param user
   */
  public async getAllGroups(): Promise<IGroup[]> {
    return Group.find().populate('users');
  }

  public async getGroupsOfUser(user: IUser): Promise<IGroup[]> {
    return Group.find({
      users: user.id,
    })
      .populate('users', 'firstName lastName email avatar')
      .exec();
  }

  async getNewGroups(user: IUser): Promise<IGroup[]> {
    return Group.find({
      users: {
        $ne: user.id,
      },
      type: GroupType.GROUP,
    })
      .populate('users', 'firstName lastName email avatar')
      .exec();
  }

  async getUserDmList(user: IUser): Promise<IGroup[]> {
    return Group.find({
      users: user.id,
      type: GroupType.DM,
    }).select('users');
  }
}
