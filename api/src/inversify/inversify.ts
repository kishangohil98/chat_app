import { Container } from 'inversify';
// Datastores
import { UserDatastore } from '../database/UserDatastore';
import { IUserDatastore } from '../database/interface/IUserDatastore';
import { GroupDatastore } from '../database/GroupDatastore';
import { IGroupDatastore } from '../database/interface/IGroupDatastore';

// Repositories
import { IUserRepository } from '../repositories/interface/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';

import { IGroupRepository } from '../repositories/interface/IGroupRepository';
import { GroupRepository } from '../repositories/GroupRepository';
import { INVERSIFY_TYPES } from './inversifyTypes';

// Controllers
import { IRouterController } from '../controllers/IRouterController';
import { UserController } from '../controllers/UserController/UserController';
import { GroupController } from '../controllers/GroupController/GroupController';
import { IndexController } from '../controllers/IndexController/IndexController';
import { Server } from '../server/server';
import { ILogger } from '../common/logger/ILogger';
import { WinstonLogger } from '../common/logger/WinstonLogger';
import { LoggerMiddleware } from '../middlerware/LoggerMiddleware';
import { UserRegistrationValidationMiddleware } from '../controllers/UserController/UserRegistrationValidationMiddleware';
import { JoinGroupValidationMiddleware } from '../controllers/GroupController/JoinGroupValidationMiddleware';
import { AuthenticationMiddleware } from '../middlerware/AuthenticationMiddleware';
import { ErrorMiddleware } from '../middlerware/ErrorMiddleware';

/**
 * Initialise Inversify with Interface instances. This will initialise all the services.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseRepositories(container: Container): Container {
  // Datastore
  container.bind<IUserRepository>(INVERSIFY_TYPES.UserRepository).to(UserRepository);
  container.bind<IGroupRepository>(INVERSIFY_TYPES.GroupRepository).to(GroupRepository);
  return container;
}

export function initialiseDatastore(container: Container): Container {
  // Repository
  container.bind<IUserDatastore>(INVERSIFY_TYPES.UserDatastore).to(UserDatastore);
  container.bind<IGroupDatastore>(INVERSIFY_TYPES.GroupDatastore).to(GroupDatastore);
  return container;
}

export function initialiseServer(inversifyContainer: Container): Container {
  inversifyContainer.bind<IRouterController>(INVERSIFY_TYPES.Controller).to(IndexController);
  // User Controller
  inversifyContainer.bind<IRouterController>(INVERSIFY_TYPES.Controller).to(UserController);
  // User Controller
  inversifyContainer.bind<IRouterController>(INVERSIFY_TYPES.Controller).to(GroupController);
  // Server
  inversifyContainer.bind<Server>(INVERSIFY_TYPES.Server).to(Server).inSingletonScope();
  // Logger middleware
  inversifyContainer.bind<LoggerMiddleware>(INVERSIFY_TYPES.LoggerMiddleware).to(LoggerMiddleware);

  // Validation Middleware
  inversifyContainer
    .bind<UserRegistrationValidationMiddleware>(
      INVERSIFY_TYPES.UserRegistrationValidationMiddleware,
    )
    .to(UserRegistrationValidationMiddleware);
  inversifyContainer
    .bind<JoinGroupValidationMiddleware>(INVERSIFY_TYPES.JoinGroupValidationMiddleware)
    .to(JoinGroupValidationMiddleware);

  // Authentication Middleware
  inversifyContainer
    .bind<AuthenticationMiddleware>(INVERSIFY_TYPES.AuthenticationMiddleware)
    .to(AuthenticationMiddleware);

  inversifyContainer.bind<ErrorMiddleware>(INVERSIFY_TYPES.ErrorMiddleware).to(ErrorMiddleware);

  return inversifyContainer;
}

export function initialiseLogger(inversifyContainer: Container): Container {
  inversifyContainer.bind<ILogger>(INVERSIFY_TYPES.Logger).to(WinstonLogger).inSingletonScope();
  return inversifyContainer;
}
