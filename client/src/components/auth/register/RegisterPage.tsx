import { useState } from 'react';
import LandingPage from '../..//landing/LandingPage';
import RegisterForm from './RegisterForm';

const RegisterPage = (): JSX.Element => {
  const [isLogged] = useState(!!(localStorage.getItem('accessToken')));

  return isLogged
    ? <LandingPage />
    : (
      <RegisterForm />
    );
};

export default RegisterPage;