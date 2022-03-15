import { IUser } from '../../entities/user'
import { IGroup } from '../../entities/Group'
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

  getUser(id: string): Promise<IUser | null>

  login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<IUserWithToken>

  getListOfUsers(user: IUser): Promise<IUser[]>

  addUserToGroup(user: IUser, userId: string): Promise<void>

  getListOfGroup(user: IUser): Promise<IGroup[]>

  getNewGroup(user: IUser): Promise<IGroup[]>
}
