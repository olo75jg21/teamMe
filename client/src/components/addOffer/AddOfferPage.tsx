import useIsUserLogged from '../../utils/useIsUserLogged';
import LoginPage from '../login/LoginPage';

import { AddOfferForm } from './AddOfferForm';

export const AddOfferPage = (): JSX.Element => {
  const { isLogged, cookiesData } = useIsUserLogged()
  const userId = cookiesData.credentials?.user._id
  const token = cookiesData.credentials?.token

  return !isLogged
    ? <LoginPage />
    : (
      <AddOfferForm userId={userId} />
    );
};