import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import useGetUserCookies from '../hooks/useGetUserCookies';
import useIsUserLoggedIn from '../hooks/useIsUserLoggedIn';
import { useCookies } from 'react-cookie';

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

  if (error.response && error.response.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true
    try {
      const userCookies = useGetUserCookies()
      const [cookies, setCookies, removeCookies] = useCookies(['refreshToken']);

      const response = await axios.post(`${baseURL}/refresh`, { refreshTokien: userCookies })

      if (response.status === 200 || response.status === 204) {
        setCookies('refreshToken', response.data.authorization.refresh_token) // TODO add expire time
        localStorage.setItem('token', JSON.stringify(response.data.authorization.access_token))
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.authorization.access_token}`

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
})

export default axiosInstance;