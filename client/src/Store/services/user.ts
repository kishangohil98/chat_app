import axiosInstance, { axiosSimple } from '../../Axios/index';
import { User } from '../../Models/User';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../Static';

export const getUserDetails = async () => axiosInstance.get<User>('user/details');

export const refreshToken = async () => {
  const { data } = await axiosSimple.get<User>('user/refresh-token');
  if (data.accessToken && data.refreshToken) {
    // Setting access and refresh token to local storage
    // to identify user's principle in browser
    localStorage.setItem(ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
  } else {
    throw new Error('Access token and Refresh token not generated');
  }
};
