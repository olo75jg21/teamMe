import LoginForm from './LoginForm';
import { BackgroundBlobs } from '../tailwind/BackgroundBloobs';

const LoginPage = (): JSX.Element => {
  return (
    <div>
      <div className='bg-slate-200 flex h-screen'>
        <div className='m-auto'>
          <BackgroundBlobs />
          <LoginForm />
        </div>
      </div>
    </div >
  );
};

export default LoginPage;