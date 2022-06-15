import axiosInstance from '../../Axios/index';
import { User } from '../../Models/User';

export const getUserDetails = async () => axiosInstance.get<User>('user/details');
