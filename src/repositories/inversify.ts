import { Container } from 'inversify'
import { IUserRepository } from './interface/IUserRepository'
import { UserRepository } from './UserRepository'
import { SERVICE_TYPES } from './ServiceTypes'

/**
 * Initialise Inversify with Interface instances. This will initialise all the services.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseRepositories(container: Container): Container {
  // Repository
  container
    .bind<IUserRepository>(SERVICE_TYPES.UserRepository)
    .to(UserRepository)
  return container
}
