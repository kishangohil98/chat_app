import { inject, injectable } from 'inversify';
import * as express from 'express';
import * as JWT from 'jsonwebtoken';
import { ILogger } from '../common/logger/ILogger';
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes';
import { expressCb } from './expressCb';
import { config } from '../../config';
import { IUserRepository } from '../repositories/interface/IUserRepository';
import { IUser } from '../entities/interfaces/IUser';
import {
  AUTH_FAIL_INVALID_JWT,
  AUTH_FAIL_MISSING_JWT,
  AUTH_FAIL_USER_NOT_FOUND,
} from '../common/contants/ErrorMessages';

@injectable()
export class AuthenticationMiddleware {
  constructor(
    @inject(INVERSIFY_TYPES.Logger)
    private logger: ILogger,
    @inject(INVERSIFY_TYPES.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  /**
   * Middleware to verify json web token
   */
  public handler(): expressCb {
    return (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction,
    ): void => {
      const token = request.headers.token?.toString();

      if (!token) {
        this.logger.info(AUTH_FAIL_MISSING_JWT);
        response.status(401).json({
          message: AUTH_FAIL_MISSING_JWT,
        });
        return;
      }

      JWT.verify(token, config.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          this.logger.error(AUTH_FAIL_INVALID_JWT);
          response.status(401).json({
            message: AUTH_FAIL_INVALID_JWT,
          });
          return;
        }

        const user = await this.userRepository.getUser(payload?.user?._id);

        if (!user) {
          response.status(401).json({
            message: AUTH_FAIL_USER_NOT_FOUND,
          });
          return;
        }

        this.logger.info('Authentication successful', payload);
        request.body._user = user;
        next();
      });
    };
  }

  /**
   * Function to pull out user principle from request body and to return that
   * @returns IUser
   */
  public getUserPrinciple(request: express.Request): IUser {
    return request.body._user as IUser;
  }

  /**
   * Middleware to validate refresh token
   */
  public validateRefreshToken(): expressCb {
    return (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction,
    ): void => {
      const token = request.headers.refreshtoken?.toString();

      if (!token) {
        this.logger.info(AUTH_FAIL_MISSING_JWT);
        response.status(401).json({
          message: AUTH_FAIL_MISSING_JWT,
        });
        return;
      }

      JWT.verify(token, config.JWT_REFRESH_SECRET_KEY, async (err, payload) => {
        if (err) {
          this.logger.error(AUTH_FAIL_INVALID_JWT);
          response.status(401).json({
            message: AUTH_FAIL_INVALID_JWT,
          });
          return;
        }

        const user = await this.userRepository.getUser(payload?.user?._id);

        if (!user) {
          response.status(401).json({
            message: AUTH_FAIL_USER_NOT_FOUND,
          });
          return;
        }

        this.logger.info('Refresh token valid', payload);
        request.body._user = user;
        next();
      });
    };
  }
}
