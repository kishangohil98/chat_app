export interface IUserDatastore {
  addUser(email: string): Promise<void>
}
