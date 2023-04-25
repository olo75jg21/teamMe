import { useState } from 'react';

import { ProfileData } from './ProfileData';
import LoginPage from '../login/LoginPage';
import Header from '../header/Header';
import { OfferTabs } from './OfferTabs';

export const Account = (): JSX.Element => {
  const [isLogged] = useState(!!(localStorage.getItem('accessToken')));

  return !isLogged
    ? <LoginPage />
    : (
      <div>
        <Header />

        <div className='p-5 grid grid-cols-1 sm:grid-cols1 md:grid-cols2 gap-4 md:gap-6'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <ProfileData />
            <OfferTabs />
          </div>
        </div>
      </div>
    );
};