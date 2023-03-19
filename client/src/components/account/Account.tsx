import { useState, useEffect } from 'react';
import useIsUserLogged from '../../utils/useIsUserLogged';

import { fetchSingleUser } from '../../utils/fetchingUserData';
import { ProfileData } from './ProfileData';
import LoginPage from '../login/LoginPage';

export const Account = (): JSX.Element => {
  const [user, setUser] = useState<any>('');

  const { isLogged, cookiesData } = useIsUserLogged()

  const userId = cookiesData.credentials?.user._id;
  const token = cookiesData.credentials?.token;

  useEffect(() => {
    if (isLogged) {
      (async function () {
        const response = await fetchSingleUser(userId, token);
        setUser(response);
      })();
    }
  }, [userId, token, isLogged]);

  return !isLogged
    ? <LoginPage />
    : (
      <ProfileData user={user} />
    );
};