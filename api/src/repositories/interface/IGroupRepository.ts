import { IUser } from '../../entities/interfaces/IUser';
import { IGroup } from '../../entities/Group';

export interface IGroupRepository {
  getAllGroups(): Promise<IGroup[]>;

  getGroupsOfUser(user: IUser): Promise<IGroup[]>;
}
