export interface User {
  _id: string;
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
