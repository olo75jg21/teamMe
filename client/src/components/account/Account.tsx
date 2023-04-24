import { useState } from 'react';

import { ProfileData } from './ProfileData';
import LoginPage from '../login/LoginPage';
import Header from '../header/Header';

export const Account = (): JSX.Element => {
  const [isLogged] = useState(!!(localStorage.getItem('accessToken')));

  return !isLogged
    ? <LoginPage />
    : (
      <div>
        <Header />

        <div className='p-5'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <ProfileData />
          </div>
        </div>
      </div>
    );
};