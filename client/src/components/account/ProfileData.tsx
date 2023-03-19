import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { IUser } from '../../types/types';

interface ProfileDataProps {
  user: IUser
}

export const ProfileData = ({ user }: ProfileDataProps): JSX.Element => {
  return (
    <div>
      <h2>Profile data</h2>
      {/* {console.log(user)} */}
      {user.age}
    </div>
  );
};