import * as express from 'express'
import { IUserRepository } from '../repositories/interface/IUserRepository'
import { injectable, inject } from 'inversify'
import { SERVICE_TYPES } from '../repositories/ServiceTypes'
import { IRouterController } from './IRouterController'

@injectable()
export class UserController implements IRouterController {
  public readonly router: express.Router
  private path: string = '/user'

  constructor(
    @inject(SERVICE_TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {
    this.router = express.Router()
    this.initializeRoutes()
  }
  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers)
    this.router.post(`${this.path}/register`, this.registerUser)
  }
  private getAllUsers = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await this.userRepository.getUser()
      response.json({ res: 'res from KG' })
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
      await this.userRepository.registerUser('kishan@yopmail.com')
      response.json({ res: 'Register user' })
    } catch (error) {
      next(error)
    }
  }
}