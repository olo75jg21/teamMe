import LoginForm from './LoginForm';

const LoginPage = (): JSX.Element => {
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