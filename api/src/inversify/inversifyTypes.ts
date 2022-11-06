export const INVERSIFY_TYPES = {
  // Controllers
  Controller: Symbol.for('Controller'),
  // Server
  Server: Symbol.for('ServerType'),
  // Service types
  UserRepository: Symbol.for('UserRepository'),
  GroupRepository: Symbol.for('GroupRepository'),
  MessageRepository: Symbol.for('MessageRepository'),
  // Datastore types
  Database: Symbol.for('Database'),
  UserDatastore: Symbol.for('UserDatastore'),
  GroupDatastore: Symbol.for('GroupDatastore'),
  // Logger
  Logger: Symbol.for('Logger'),
  LoggerMiddleware: Symbol.for('LoggerMiddleware'),
  UserRegistrationValidationMiddleware: Symbol.for('UserRegistrationValidationMiddleware'),
  JoinGroupValidationMiddleware: Symbol.for('JoinGroupValidationMiddleware'),
  SendMessageValidationMiddleware: Symbol.for('SendMessageValidationMiddleware'),
  AuthenticationMiddleware: Symbol.for('AuthenticationMiddleware'),
  ErrorMiddleware: Symbol.for('ErrorMiddleware'),
};
