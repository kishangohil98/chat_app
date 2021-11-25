import { inject, injectable } from 'inversify'
import { ILogger } from '../common/logger/ILogger'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'
import { expressCb } from './expressCb'
import * as express from 'express'
import * as JWT from 'jsonwebtoken'

@injectable()
export class AuthenticationMiddleware {
  constructor(
    @inject(INVERSIFY_TYPES.Logger)
    private logger: ILogger
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

      JWT.verify(token, process.env.JWT_SECRET_KEY!, (err, payload) => {
        if (err) {
          this.logger.error('Authentication failed')
          response.status(403).json({
            message: 'Authentication failed, Invalid token',
          })
          return
        } else {
          this.logger.info('Authentication successful', payload)
          request.body._payload = payload
          next()
        }
      })
    }
  }
}
