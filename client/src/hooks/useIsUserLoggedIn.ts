import { IUser } from '../types/types';

interface userData {
  accessToken: string;
  user: IUser;
}

interface IUseIsUserLoggedIn {
  isLogged: boolean;
  userData: userData; //TODO add a type
}

const useIsUserLoggedIn = (): IUseIsUserLoggedIn => {
  const isLogged = !!(localStorage.getItem('accessToken'));

  const accessToken = localStorage.getItem('accessToken');
  const accessTokenJson = accessToken ? JSON.parse(accessToken) : '';

  const user = localStorage.getItem('userData');
  const userJson = user ? JSON.parse(user) : '';

  const userData = {
    accessToken: accessTokenJson,
    user: userJson
  };

  return { isLogged, userData };
};

export default useIsUserLoggedIn;