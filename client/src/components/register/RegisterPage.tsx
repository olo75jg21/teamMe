import RegisterForm from './RegisterForm';
import { BackgroundBlobs } from '../tailwind/BackgroundBloobs';

const RegisterPage = (): JSX.Element => {
  return (
    <div className='bg-slate-200 flex h-screen'>
      <div className='m-auto'>
        <BackgroundBlobs />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;