import { IUserRegistrationSchema } from '../../controllers/UserController/UserRegistrationValidationMiddleware'
export interface IUserDatastore {
  addUser(body: IUserRegistrationSchema): Promise<void>
}
