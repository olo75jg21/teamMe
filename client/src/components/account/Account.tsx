import { useState, useEffect } from 'react';

import { fetchSingleUser } from '../../utils/fetchingUserData';
import { ProfileData } from './ProfileData';
import LoginPage from '../login/LoginPage';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import Header from '../header/Header';

export const Account = (): JSX.Element => {
  const [user, setUser] = useState<any>('');

  const { userData } = useGetLoggedUserData()
  const [isLogged] = useState(!!(localStorage.getItem('accessToken')));

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
      <div>
        <Header />
        <ProfileData user={user} />
      </div>
    );
};