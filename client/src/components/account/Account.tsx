import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { fetchSingleUser } from '../../utils/fetchingUserData';
import { ProfileData } from './ProfileData';

export const Account = (): JSX.Element => {
  const navigate = useNavigate();

  const [cookies] = useCookies(['credentials']);

  const [user, setUser] = useState<any>('');

  const userId = cookies.credentials?.user._id;
  const token = cookies.credentials?.token;

  useEffect(() => {
    (async function () {
      const res = await fetchSingleUser(userId, token);
      setUser(res);
    })();

  }, [userId, token]);

  if (!userId) navigate('/login');

  return (
    <div>
      <ProfileData user={user} />
    </div>
  );
};