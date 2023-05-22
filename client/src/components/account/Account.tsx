import { useState } from 'react';

import { ProfileData } from './ProfileData';
import LoginPage from '../login/LoginPage';
import Header from '../header/Header';
import TeamsTabs from '../team/teamsTabs/TeamsTabs';

export const Account = (): JSX.Element => {
  const [isLogged] = useState(!!(localStorage.getItem('accessToken')));

  return !isLogged
    ? <LoginPage />
    : (
      <div>
        <Header />

        <div className='p-5 pt-12 bg-gray-800'>
          <div className='grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-1'>
            <div className='bg-gray-700 h-144 col-span-1 md:col-span-1 rounded h-'>
              <ProfileData />
            </div>
            <div className='col-span-2 md:col-span-2'>
              <TeamsTabs />
            </div>
          </div>
        </div>
      </div>
    );
};