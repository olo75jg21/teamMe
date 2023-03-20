import axios, { AxiosRequestConfig } from 'axios';
import useIsUserLoggedIn from '../hooks/useIsUserLoggedIn';

const baseURL = 'http://localhost:5000/';

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const { userData } = useIsUserLoggedIn();
  console.log('interceptor', userData);

  if (userData.accessToken && userData.accessToken !== '' && config.headers)
    config.headers.Authorization = `Bearer ${userData.accessToken}`

  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance