import { IUserRegistrationSchema } from '../../controllers/UserController/UserRegistrationValidationMiddleware'
import { IUser } from '../../entities/User'

export interface IUserDatastore {
  addUser(body: IUserRegistrationSchema): Promise<IUser>

  login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<IUser | null>
}
