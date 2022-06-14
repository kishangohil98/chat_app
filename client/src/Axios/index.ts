import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../Config';

const axiosInstance = axios.create({
  baseURL: config.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  // Do something before request is sent
  // eslint-disable-next-line arrow-body-style
  (configuration: AxiosRequestConfig<any>) => {
    if (configuration.headers) {
      configuration.headers.token = localStorage.getItem('access-token') ?? '';
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
  (error) => Promise.reject(error),
);

export default axiosInstance;
