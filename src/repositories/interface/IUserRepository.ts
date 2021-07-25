export interface IUserRepository {
  registerUser(email: string): Promise<void>
  getUser(): Promise<void>
}
