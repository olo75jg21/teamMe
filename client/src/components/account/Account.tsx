import { useState, useEffect } from 'react';
import useIsUserLogged from '../../hooks/useIsUserLoggedIn';

import { fetchSingleUser } from '../../utils/fetchingUserData';
import { ProfileData } from './ProfileData';
import LoginPage from '../login/LoginPage';

export const Account = (): JSX.Element => {
  const [user, setUser] = useState<any>('');

  const { isLogged, userData } = useIsUserLogged()

  const userId = userData.user._id;
  const token = userData.accessToken;

  useEffect(() => {
    if (isLogged) {
      (async function () {
        const response = await fetchSingleUser(userId, token);
        setUser(response);
      })();
    }
  }, [isLogged, userId, token]);

  return !isLogged
    ? <LoginPage />
    : (
      <ProfileData user={user} />
    );
};