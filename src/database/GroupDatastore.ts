import { IGroupDatastore } from './interface/IGroupDatastore'
import { Group, IGroup } from '../entities/Group'
import { injectable } from 'inversify'

@injectable()
export class GroupDatastore implements IGroupDatastore {
  public async addGroup(group: IGroup): Promise<void> {
    await group.save()
  }
}
