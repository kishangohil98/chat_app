import * as express from 'express';
import { injectable } from 'inversify';
import { IRouterController } from '../IRouterController';

@injectable()
export class IndexController implements IRouterController {
  public readonly router: express.Router;

  private path = '/';

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getIndex);
  }

  private getIndex = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      response.status(200).send(`
      <p style="text-align: center;">
        Welcome to Chat App API!!!
      </p>`);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
