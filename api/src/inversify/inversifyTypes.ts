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
  GroupDatastore: Symbol.for('GroupDatastore'),
  // Logger
  Logger: Symbol.for('Logger'),
  LoggerMiddleware: Symbol.for('LoggerMiddleware'),
  UserRegistrationValidationMiddleware: Symbol.for(
    'UserRegistrationValidationMiddleware',
  ),
  AuthenticationMiddleware: Symbol.for('AuthenticationMiddleware'),
  ErrorMiddleware: Symbol.for('ErrorMiddleware'),
};
