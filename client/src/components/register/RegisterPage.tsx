import useIsUserLoggedIn from '../../hooks/useIsUserLoggedIn';
import LandingPage from '../landing/LandingPage';
import RegisterForm from './RegisterForm';

const RegisterPage = (): JSX.Element => {
  const { isLogged } = useIsUserLoggedIn();

  return !isLogged
    ? <LandingPage />
    : (
      <RegisterForm />
    );
};

export default RegisterPage;