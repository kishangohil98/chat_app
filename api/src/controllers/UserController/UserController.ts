import * as express from 'express';
import { injectable, inject } from 'inversify';
import { IUserRepository } from '../../repositories/interface/IUserRepository';
import { INVERSIFY_TYPES } from '../../inversify/inversifyTypes';
import { IRouterController } from '../IRouterController';
import { EMAIL_ALREADY_REGISTERED } from '../../common/errorMessages';
import { UserRegistrationValidationMiddleware } from './UserRegistrationValidationMiddleware';
import { AuthenticationMiddleware } from '../../middlerware/AuthenticationMiddleware';
import { BadRequestException } from '../../common/exceptions/BadRequestException';

@injectable()
export class UserController implements IRouterController {
  public readonly router: express.Router;

  private path = '/user';

  constructor(
    @inject(INVERSIFY_TYPES.UserRepository)
    private userRepository: IUserRepository,
    @inject(INVERSIFY_TYPES.UserRegistrationValidationMiddleware)
    private userRegistrationValidationMiddleware: UserRegistrationValidationMiddleware,
    @inject(INVERSIFY_TYPES.AuthenticationMiddleware)
    private authenticationMiddleware: AuthenticationMiddleware,
  ) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);

    this.router.post(
      `${this.path}/register`,
      this.userRegistrationValidationMiddleware.handler(),
      this.registerUser,
    );

    this.router.post(`${this.path}/login`, this.login);

    this.router.get(
      `${this.path}/details`,
      this.authenticationMiddleware.handler(),
      this.getUserDetails,
    );

    this.router.get(`${this.path}/list`, this.authenticationMiddleware.handler(), this.listUsers);

    this.router.post(
      `${this.path}/group`,
      this.authenticationMiddleware.handler(),
      this.addUserToGroup,
    );

    this.router.get(
      `${this.path}/group`,
      this.authenticationMiddleware.handler(),
      this.getListOfGroup,
    );

    this.router.get(
      `${this.path}/group/new`,
      this.authenticationMiddleware.handler(),
      this.getNewGroup,
    );
  }

  private getAllUsers = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const users = await this.userRepository.getAllUsers();
      response.json(users);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  private registerUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const data = await this.userRepository.registerUser(request.body);
      response.json(data);
    } catch (error) {
      if (error.code === 11000) {
        /**
         * Mongoose duplicate entry error code - email
         */
        response.status(400).json({
          message: EMAIL_ALREADY_REGISTERED,
        });
      }
      next(error);
    }
  };

  private login = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      if (!request.body.email || !request.body.password) {
        response.status(400).json({
          message: 'Request body validation failed for Login',
        });
      }

      const loginResponse = await this.userRepository.login(request.body);
      response.status(200).json(loginResponse);
    } catch (error) {
      next(error);
    }
  };

  private getUserDetails = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      response.send('asdas');
      await this.userRepository.getUser('');
    } catch (error) {
      next(error);
    }
  };

  private listUsers = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      await this.userRepository.getAllUsers();
    } catch (error) {
      next(error);
    }
  };

  private addUserToGroup = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
    // eslint-disable-next-line consistent-return
  ) => {
    try {
      if (!request.body.userId) {
        throw new BadRequestException('User id is required');
      }
      const user = await this.userRepository.getUser(request.body._payload?.user?._id);
      if (!user) {
        return response.status(403).json({
          message: 'Authentication failed, User not found',
        });
      }
      await this.userRepository.addUserToGroup(user, request.body.userId);
      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  private getListOfGroup = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const user = this.authenticationMiddleware.getUserPrinciple(request);

      const groups = await this.userRepository.getListOfGroup(user);

      response.json(groups);
    } catch (error) {
      next(error);
    }
  };

  private getNewGroup = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const user = this.authenticationMiddleware.getUserPrinciple(request);

      const groups = await this.userRepository.getNewGroup(user);

      response.json(groups);
    } catch (error) {
      next(error);
    }
  };
}
