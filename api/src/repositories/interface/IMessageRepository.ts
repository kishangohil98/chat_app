import { IUser } from '../../entities/interfaces/IUser';
import { ISendMessageSchema } from '../../controllers/MessageController/SendMessageValidationMiddleware';
import { IMessage } from '../../entities/Message';

export interface IMessageRepository {
  sendMessage(user: IUser, body: ISendMessageSchema): Promise<IMessage>;
}
