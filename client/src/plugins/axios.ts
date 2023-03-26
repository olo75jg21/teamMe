import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import useGetLoggedUserData from '../hooks/useGetLoggedUserData';
import useIsUserLoggedIn from '../hooks/useGetLoggedUserData';

const baseURL = 'http://localhost:5000/';
const baseFrontURL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  console.log('request');
  const { userData } = useIsUserLoggedIn();

  if (userData.accessToken && userData.accessToken !== '' && config.headers)
    config.headers.Authorization = `Bearer ${userData.accessToken}`

  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((res: AxiosResponse) => {
  return res
}, async error => {
  console.log('refresh');
  const originalConfig = error.config
  const { userData } = useGetLoggedUserData();

  if (error.response && error.response.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true
    try {
      console.log('refresh token from interceptor', userData.refreshToken);
      const response = await axios.post(`${baseURL}auth/refresh`, { refreshToken: userData.refreshToken })
      console.log('refreshed');

      console.log('response from inter', response);

      if (response.status === 200 || response.status === 204) {
        localStorage.setItem('refreshToken', JSON.stringify(response.data.accessToken));
        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.authorization.access_token}`;

        return await axiosInstance(originalConfig)
      }
    }
    catch (_error: any) {
      if (_error.response.status === 401) {

        window.location.href = `${baseFrontURL}login` // TODO change the way of redirecting user
      }
      if (_error.response && _error.response.data)
        return Promise.reject(_error.response.data)

      return Promise.reject(_error)
    }
  }

  return Promise.reject(error)
});

export default axiosInstance;