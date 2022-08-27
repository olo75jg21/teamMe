import { useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';

import LoginForm from './LoginForm';
import { BackgroundBlob } from './tailwind/BackgroundBlob';

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
          <BackgroundBlob
            topOffset={40}
            leftOffset={80}
            width={16}
            height={16}
            bgColorHex='#abcef7'
          />
          <LoginForm />
        </div>
      </div>
    </div >
  );
};

export default LoginPage;