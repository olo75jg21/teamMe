import RegisterForm from './RegisterForm';

const RegisterPage = (): JSX.Element => {
  return (
    <div className='bg-slate-200 flex h-screen'>
      <div className='m-auto'>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;