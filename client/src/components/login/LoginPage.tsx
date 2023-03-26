import { useState } from 'react';
import LandingPage from '../landing/LandingPage';
import LoginForm from './LoginForm';

const LoginPage = (): JSX.Element => {
  const [isLogged] = useState(!!(localStorage.getItem('accessToken')));


  return isLogged
    ? <LandingPage />
    : (
      <LoginForm />
    );
};

export default LoginPage;