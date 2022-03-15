import { inject, injectable } from 'inversify'
import { ILogger } from '../common/logger/ILogger'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'
import { expressCb } from './expressCb'
import * as express from 'express'
import * as JWT from 'jsonwebtoken'
import { config } from '../../config'
import { IUserRepository } from '../repositories/interface/IUserRepository'
import { IUser } from '../entities/user'

@injectable()
export class AuthenticationMiddleware {
  constructor(
    @inject(INVERSIFY_TYPES.Logger)
    private logger: ILogger,
    @inject(INVERSIFY_TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  /**
   * Middleware to verify json web token
   */
  public handler(): expressCb {
    return (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ): void => {
      const token = request.headers.token?.toString()

      if (!token) {
        this.logger.info('No access token found')
        response.status(403).json({
          message: 'Authentication failed, Missing JWT Token',
        })
        return
      }

      JWT.verify(token, config.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          this.logger.error('Authentication failed')
          response.status(403).json({
            message: 'Authentication failed, Invalid token',
          })
        }

        const user = await this.userRepository.getUser(payload?.user?._id)

        if (!user) {
          response.status(403).json({
            message: 'Authentication failed, User not found',
          })
        }

        this.logger.info('Authentication successful', payload)
        request.body._user = user
        next()
      })
    }
  }

  /**
   * Function to pull out user principle from request body and to return that
   * @returns IUser
   */
  public getUserPrinciple(request: express.Request): IUser {
    return request.body._user as IUser
  }
}
