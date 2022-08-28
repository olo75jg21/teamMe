import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { useCookies } from 'react-cookie';

const LandingPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.auth.user);
  const [cookies, setCookies] = useCookies(['credentials']);

  useEffect(() => {
    console.log(user);
    console.log(cookies);
  }, [user]);

  return (
    <div className="bg-slate-200 flex h-fit">
      <div className='m-auto'>
        <h2>Landing Page</h2>
      </div>
    </div>
  );
};

export default LandingPage;