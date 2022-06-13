import { IUserRegistrationSchema } from '../../controllers/UserController/UserRegistrationValidationMiddleware';
import { IUser } from '../../entities/interfaces/IUser';

export interface IUserDatastore {
  addUser(body: IUserRegistrationSchema): Promise<IUser>;

  login({ email, password }: { email: string; password: string }): Promise<IUser | null>;
}
