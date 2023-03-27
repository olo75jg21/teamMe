import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';
import useGetLoggedUserData from '../hooks/useGetLoggedUserData';
import useIsUserLoggedIn from '../hooks/useGetLoggedUserData';

const baseURL = 'http://localhost:5000/';
const baseFrontURL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
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
  const originalConfig = error.config
  const { userData } = useGetLoggedUserData();

  if (error.response && error.response.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true
    try {
      const response = await axios.post(`${baseURL}auth/refresh`, { refreshToken: userData.refreshToken })

      if (response.status === 200 || response.status === 204) {
        localStorage.setItem('refreshToken', JSON.stringify(response.data.accessToken));
        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;

        return await axiosInstance(originalConfig)
      }
    }
    catch (_error: any) {
      const err = _error as AxiosError;
      if (err.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        window.location.href = `${baseFrontURL}`
      }
      if (err.response && _error.response.data)
        return Promise.reject(_error.response.data)

      return Promise.reject(_error)
    }
  }

  return Promise.reject(error)
});

export default axiosInstance;