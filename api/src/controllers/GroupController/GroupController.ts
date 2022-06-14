import * as express from 'express';
import { injectable, inject } from 'inversify';
import { IGroupRepository } from '../../repositories/interface/IGroupRepository';
import { INVERSIFY_TYPES } from '../../inversify/inversifyTypes';
import { IRouterController } from '../IRouterController';
import { AuthenticationMiddleware } from '../../middlerware/AuthenticationMiddleware';

@injectable()
export class GroupController implements IRouterController {
  public readonly router: express.Router;

  private path = '/group';

  constructor(
    @inject(INVERSIFY_TYPES.GroupRepository)
    private groupRepository: IGroupRepository,
    @inject(INVERSIFY_TYPES.AuthenticationMiddleware)
    private authenticationMiddleware: AuthenticationMiddleware,
  ) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.authenticationMiddleware.handler(), this.getAllGroups);

    this.router.get(this.path, this.authenticationMiddleware.handler(), this.getGroupsOfUser);
  }

  private getAllGroups = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const groups = await this.groupRepository.getAllGroups();

      response.status(200).json(groups);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  private getGroupsOfUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const user = this.authenticationMiddleware.getUserPrinciple(request);
      const groups = await this.groupRepository.getGroupsOfUser(user);

      response.status(200).json(groups);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
