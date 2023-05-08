import { IUser } from '../types/user';

interface userData {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface IGetLoggedUserData {
  userData: userData;
}

const useGetLoggedUserData = (): IGetLoggedUserData => {
  const accessToken = localStorage.getItem('accessToken');
  const accessTokenJson = accessToken ? JSON.parse(accessToken) : '';

  const user = localStorage.getItem('userData');
  const userJson = user ? JSON.parse(user) : '';

  const refreshToken = localStorage.getItem('refreshToken');
  const refreshTokenJson = refreshToken ? JSON.parse(refreshToken) : '';

  const userData = {
    accessToken: accessTokenJson,
    refreshToken: refreshTokenJson,
    user: userJson
  };

  return { userData };
};

export default useGetLoggedUserData;