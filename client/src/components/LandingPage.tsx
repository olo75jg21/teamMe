import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setCredentials } from '../redux/features/authSlice';

const LandingPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCredentials({ user: ' 12' }));
    console.log(user);
  });

  return (
    <div>Landing Page</div>
  );
};

export default LandingPage;