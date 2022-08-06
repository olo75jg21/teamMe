import { useAppSelector } from '../redux/hooks';

import LoginForm from './LoginForm';
import { useEffect } from 'react';

const LoginPage = (): JSX.Element => {
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {
    console.log(user);
    console.log(token);
  }, [user, token]);

  return (
    <div>
      <div className='bg-slate-200 flex h-screen'>
        <div className='m-auto'>
          <LoginForm />
        </div>
      </div>
    </div >
  );
};

export default LoginPage;