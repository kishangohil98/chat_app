import * as express from 'express';
import { injectable, inject } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify/inversifyTypes';
import { IRouterController } from '../IRouterController';
import { AuthenticationMiddleware } from '../../middlerware/AuthenticationMiddleware';
import { SendMessageValidationMiddleware } from './SendMessageValidationMiddleware';
import { IMessageRepository } from '../../repositories/interface/IMessageRepository';

@injectable()
export class MessageController implements IRouterController {
  public readonly router: express.Router;

  private path = '/message';

  constructor(
    @inject(INVERSIFY_TYPES.MessageRepository)
    private messageRepository: IMessageRepository,
    @inject(INVERSIFY_TYPES.AuthenticationMiddleware)
    private authenticationMiddleware: AuthenticationMiddleware,
    @inject(INVERSIFY_TYPES.SendMessageValidationMiddleware)
    private sendMessageValidationMiddleware: SendMessageValidationMiddleware,
  ) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      this.authenticationMiddleware.handler(),
      this.sendMessageValidationMiddleware.handler(),
      this.sendMessage,
    );
  }

  private sendMessage = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const user = this.authenticationMiddleware.getUserPrinciple(request);

      const message = await this.messageRepository.sendMessage(user, request.body);

      response.status(200).json(message);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
