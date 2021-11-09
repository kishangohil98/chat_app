import { IUser } from '../../entities/User'
import { IUserRegistrationSchema } from '../../controllers/UserController/UserRegistrationValidationMiddleware'

export interface IUserWithToken {
  user: IUser
  token: string
}

export interface IUserPayload {
  user: IUser
}
export interface IUserRepository {
  registerUser(body: IUserRegistrationSchema): Promise<IUserWithToken>
  getUser(): Promise<void>

  login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<IUserWithToken>
}
