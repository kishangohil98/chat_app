import { Container } from 'inversify'
import { IRouterController } from '../controllers/IRouterController'
import { INVERSIFY_TYPES } from '../inversify/inversify'
import { UserController } from '../controllers/UserController'
import { Server } from './server'

export function initialiseServer(inversifyContainer: Container): Container {
  // User Controller
  inversifyContainer
    .bind<IRouterController>(INVERSIFY_TYPES.Controller)
    .to(UserController)
  // Server
  inversifyContainer
    .bind<Server>(INVERSIFY_TYPES.Server)
    .to(Server)
    .inSingletonScope()

  return inversifyContainer
}
