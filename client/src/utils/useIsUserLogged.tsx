import { useCookies } from 'react-cookie';

interface IUseIsUserLogged {
  isLogged: boolean;
  cookiesData: any; //TODO add a type
}

const useIsUserLogged = (): IUseIsUserLogged => {
  const [cookiesData] = useCookies(['credentials']);
  const isLogged = !!cookiesData.credentials

  return { isLogged, cookiesData };
};

export default useIsUserLogged;