import { Container } from 'inversify'
import { IUserRepository } from './interface/IUserRepository'
import { UserRepository } from './UserRepository'
import { INVERSIFY_TYPES } from '../inversify/inversify'

/**
 * Initialise Inversify with Interface instances. This will initialise all the services.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseRepositories(container: Container): Container {
  // Repository
  container
    .bind<IUserRepository>(INVERSIFY_TYPES.UserRepository)
    .to(UserRepository)
  return container
}
