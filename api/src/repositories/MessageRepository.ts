import { inject, injectable } from 'inversify';
import { Types, Schema } from 'mongoose';
import { BadRequestException } from '../common/exceptions/BadRequestException';
import { IMessageRepository } from './interface/IMessageRepository';
import { IGroupDatastore } from '../database/interface/IGroupDatastore';
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes';
import { IUser } from '../entities/interfaces/IUser';
import { Group, GroupType, IGroup } from '../entities/Group';
import { Message, MessageType, IMessage } from '../entities/Message';
import { ISendMessageSchema } from '../controllers/MessageController/SendMessageValidationMiddleware';

@injectable()
export class MessageRepository implements IMessageRepository {
  constructor(
    @inject(INVERSIFY_TYPES.GroupDatastore)
    private groupDatastore: IGroupDatastore,
  ) {}

  public async sendMessage(user: IUser, body: ISendMessageSchema): Promise<IMessage> {
    const group = await Group.findById(body.groupId);
    if (!group) {
      throw new BadRequestException('Invalid groupId');
    }
    await this.validateUserInGroup(group, user);

    return Message.create({
      groupId: group.id,
      message: body.textMessage,
      type: MessageType.TEXT,
      senderId: user.id,
    });
  }

  public async getGroupMessages(user: IUser, groupId: string): Promise<IMessage[]> {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new BadRequestException('Invalid groupId');
    }
    await this.validateUserInGroup(group, user);

    return Message.find({
      groupId: Types.ObjectId(groupId),
    }).sort('createdAt');
  }

  private async validateUserInGroup(group: IGroup, user: IUser): Promise<void> {
    if (!group.users.includes(user.id)) {
      throw new BadRequestException('User does not have access to this group');
    }
  }
}
