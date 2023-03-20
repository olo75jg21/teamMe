import useIsUserLogged from '../../hooks/useIsUserLoggedIn';
import LoginPage from '../login/LoginPage';

import { AddOfferForm } from './AddOfferForm';

export const AddOfferPage = (): JSX.Element => {
  const { isLogged, userData } = useIsUserLogged()
  const userId = userData.user._id;

  return !isLogged
    ? <LoginPage />
    : (
      <AddOfferForm userId={userId} />
    );
};