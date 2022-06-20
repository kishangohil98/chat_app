import { IGroup } from '../../entities/Group';
import { IUser } from '../../entities/interfaces/IUser';

export interface IGroupDatastore {
  addGroup(group: IGroup): Promise<void>;

  getAllGroups(): Promise<IGroup[]>;

  getGroupsOfUser(user: IUser): Promise<IGroup[]>;

  getNewGroups(user: IUser): Promise<IGroup[]>;

  getUserDmList(user: IUser): Promise<IGroup[]>;
}
