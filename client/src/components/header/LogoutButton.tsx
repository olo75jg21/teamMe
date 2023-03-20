import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

export const LogoutButton = (): JSX.Element => {
  const [cookies, , removeCookies] = useCookies(['refreshToken']);
  const user = cookies.refreshToken

  const handleLogout = () => {
    removeCookies('refreshToken', { path: '/' });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
  }

  return (
    user
      ?
      <NavLink
        to='/'
        onClick={handleLogout}
        className="block py-2 pr-4 pl-3 text-slate-300 text-xl text-gray-400 hover:underline hover:underline-offset-8 
        duration-200 md:p-2 hover:text-white md:hover:bg-transparent"
      >
        Logout
      </NavLink>
      :
      <></>
  );
};