import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';

const LandingPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="bg-slate-200 flex h-screen">
      <div className='m-auto'>
        <h2>Landing Page</h2>
      </div>
    </div>
  );
};

export default LandingPage;