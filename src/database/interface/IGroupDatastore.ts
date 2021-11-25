import { IGroup } from '../../entities/Group'

export interface IGroupDatastore {
  addGroup(group: IGroup): Promise<void>
}
