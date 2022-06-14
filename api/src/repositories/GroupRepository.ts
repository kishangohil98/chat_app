import { inject, injectable } from 'inversify';
import { IGroupRepository } from './interface/IGroupRepository';
import { IGroupDatastore } from '../database/interface/IGroupDatastore';
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes';
import { IUser } from '../entities/interfaces/IUser';
import { IGroup } from '../entities/Group';

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
}
