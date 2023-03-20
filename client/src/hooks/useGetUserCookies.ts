import { useCookies } from 'react-cookie';

interface IUseGetUserCookies {
  cookiesData: string; //TODO add a type
}

const useGetUserCookies = (): IUseGetUserCookies => {
  const [cookiesData] = useCookies(['refreshToken']);

  return cookiesData.refreshToken;
};

export default useGetUserCookies;