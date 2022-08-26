import { IUser } from '../../entities/interfaces/IUser';
import { IGroup } from '../../entities/Group';
import { IJoinGroupSchema } from '../../controllers/GroupController/JoinGroupValidationMiddleware';

export interface IGroupRepository {
  getAllGroups(): Promise<IGroup[]>;

  getGroupsOfUser(user: IUser): Promise<IGroup[]>;

  getNewGroups(user: IUser): Promise<{
    users: IUser[];
    groups: IGroup[];
  }>;

  joinNewGroup(user: IUser, body: IJoinGroupSchema): Promise<void>;
}
