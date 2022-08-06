import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

const LandingPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      Landing Page
    </div>
  );
};

export default LandingPage;