import { IUserRegistrationSchema } from '../../controllers/UserController/UserRegistrationValidationMiddleware'
export interface IUserRepository {
  registerUser(body: IUserRegistrationSchema): Promise<void>
  getUser(): Promise<void>
}
