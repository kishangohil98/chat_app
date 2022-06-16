import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../Config';
import { AUTH_FAIL_INVALID_JWT, REFRESH_TOKEN, ACCESS_TOKEN } from '../Static/index';
import { refreshToken } from '../Store/services/user';

const axiosInstance = axios.create({
  baseURL: config.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  // Do something before request is sent
  // eslint-disable-next-line arrow-body-style
  (configuration: AxiosRequestConfig<any>) => {
    if (configuration.headers) {
      configuration.headers.token = localStorage.getItem('access-token') ?? '';
      configuration.headers.refreshtoken = localStorage.getItem('refresh-token') ?? '';
    }
    return configuration;
  },
  // Do something with request error
  (error) => Promise.reject(error),
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  (response) => response,
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  async (error) => {
    if (error.response) {
      if (
        error.response.status === 401 &&
        error.response?.data?.message === AUTH_FAIL_INVALID_JWT &&
        localStorage.getItem(REFRESH_TOKEN)
      ) {
        try {
          await refreshToken();
          const originalRequest = error.config;
          // NOTE: Refresh token has been fetched and updated in the browser local storage
          // Below request will use valid access token to retry request
          return axiosInstance(originalRequest);
        } catch (errorInRefreshToken) {
          console.error('Error in Axios Refresh token fetch', errorInRefreshToken);
          // Remove user principle from browser
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const axiosSimple = axios.create({
  baseURL: config.REACT_APP_API_URL,
  headers: {
    token: localStorage.getItem('access-token') || '',
    refreshtoken: localStorage.getItem('refresh-token') || '',
  },
});

export default axiosInstance;
