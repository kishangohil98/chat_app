import * as express from 'express'
import { IUserRepository } from '../../repositories/interface/IUserRepository'
import { injectable, inject } from 'inversify'
import { INVERSIFY_TYPES } from '../../inversify/inversifyTypes'
import { IRouterController } from '../IRouterController'
import { EMAIL_ALREADY_REGISTERED } from '../../common/errorMessages'
import { UserRegistrationValidationMiddleware } from './UserRegistrationValidationMiddleware'

@injectable()
export class UserController implements IRouterController {
  public readonly router: express.Router
  private path: string = '/user'

  constructor(
    @inject(INVERSIFY_TYPES.UserRepository)
    private userRepository: IUserRepository,
    @inject(INVERSIFY_TYPES.UserRegistrationValidationMiddleware)
    private userRegistrationValidationMiddleware: UserRegistrationValidationMiddleware
  ) {
    this.router = express.Router()
    this.initializeRoutes()
  }
  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers)
    this.router.post(
      `${this.path}/register`,
      this.userRegistrationValidationMiddleware.handler(),
      this.registerUser
    )
  }
  private getAllUsers = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await this.userRepository.getUser()
      response.json({})
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  private registerUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await this.userRepository.registerUser(request.body)
      response.json({})
    } catch (error) {
      if (error.code === 11000) {
        /**
         * Mongoose duplicate entry error code - email
         */
        response.status(400).json({
          message: EMAIL_ALREADY_REGISTERED,
        })
      }
      next(error)
    }
  }
}
