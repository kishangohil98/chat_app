import { Container } from 'inversify'
// Datastores
import { UserDatastore } from '../database/UserDatastore'
import { IUserDatastore } from '../database/interface/IUserDatastore'

// Repositories
import { IUserRepository } from '../repositories/interface/IUserRepository'
import { UserRepository } from '../../src/repositories/UserRepository'
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes'

// Controllers
import { IRouterController } from '../controllers/IRouterController'
import { UserController } from '../controllers/UserController'
import { Server } from '../server/server'
import { ILogger } from '../common/logger/ILogger'
import { WinstonLogger } from '../common/logger/winstonLogger'
import { LoggerMiddleware } from '../middlerware/LoggerMiddleware'

/**
 * Initialise Inversify with Interface instances. This will initialise all the services.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseRepositories(container: Container): Container {
  // Datastore
  container
    .bind<IUserRepository>(INVERSIFY_TYPES.UserRepository)
    .to(UserRepository)
  return container
}

export function initialiseDatastore(container: Container): Container {
  // Repository
  container
    .bind<IUserDatastore>(INVERSIFY_TYPES.UserDatastore)
    .to(UserDatastore)
  return container
}

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
  // Logger middleware
  inversifyContainer
    .bind<LoggerMiddleware>(INVERSIFY_TYPES.LoggerMiddleware)
    .to(LoggerMiddleware)

  return inversifyContainer
}

export function initialiseLogger(inversifyContainer: Container): Container {
  inversifyContainer
    .bind<ILogger>(INVERSIFY_TYPES.Logger)
    .to(WinstonLogger)
    .inSingletonScope()
  return inversifyContainer
}
