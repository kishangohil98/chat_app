import { Container } from 'inversify'
import { IRouterController } from '../controllers/IRouterController'
import { SERVER_TYPES } from './ServerTypes'
import { UserController } from '../controllers/UserController'
import { Server } from './server'

export function initialiseServer(inversifyContainer: Container): Container {
  // User Controller
  inversifyContainer
    .bind<IRouterController>(SERVER_TYPES.Controller)
    .to(UserController)
  // Server
  inversifyContainer
    .bind<Server>(SERVER_TYPES.Server)
    .to(Server)
    .inSingletonScope()

  return inversifyContainer
}
