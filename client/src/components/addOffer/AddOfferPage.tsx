import { useState } from 'react';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import Header from '../header/Header';
import LoginPage from '../login/LoginPage';

import { AddOfferForm } from './AddOfferForm';

export const AddOfferPage = (): JSX.Element => {
  const { userData } = useGetLoggedUserData();
  const [isLogged] = useState(!!(localStorage.getItem('accessToken')));
  const userId = userData.user._id;

  return !isLogged
    ? <LoginPage />
    : (
      <div>
        <Header />
        <AddOfferForm userId={userId} />
      </div>
    );
};