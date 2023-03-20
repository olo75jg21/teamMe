import useIsUserLoggedIn from '../../hooks/useIsUserLoggedIn';
import LandingPage from '../landing/LandingPage';
import LoginForm from './LoginForm';

const LoginPage = (): JSX.Element => {
  const { isLogged } = useIsUserLoggedIn();

  return isLogged
    ? <LandingPage />
    : (
      <LoginForm />
    );
};

export default LoginPage;