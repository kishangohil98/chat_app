export const INVERSIFY_TYPES = {
  // Controllers
  Controller: Symbol.for('Controller'),
  // Server
  Server: Symbol.for('ServerType'),
  // Service types
  UserRepository: Symbol.for('UserRepository'),
  // Datastore types
  Database: Symbol.for('Database'),
  UserDatastore: Symbol.for('UserDatastore'),
  // Logger
  Logger: Symbol.for('Logger'),
  LoggerMiddleware: Symbol.for('LoggerMiddleware'),
  UserRegistrationValidationMiddleware: Symbol.for(
    'UserRegistrationValidationMiddleware'
  ),
}
