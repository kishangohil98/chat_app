import { injectable } from 'inversify';
import { IGroupDatastore } from './interface/IGroupDatastore';
import { IGroup } from '../entities/Group';

@injectable()
export class GroupDatastore implements IGroupDatastore {
  public async addGroup(group: IGroup): Promise<void> {
    await group.save();
  }
}
