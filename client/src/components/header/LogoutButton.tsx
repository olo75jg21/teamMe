import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import axios from '../../plugins/axios';

export const LogoutButton = (): JSX.Element => {
  const { userData } = useGetLoggedUserData();
  const [isLogged, setIsLogged] = useState(!!(localStorage.getItem('accessToken')));

  const handleLogout = async () => {
    try {
      const { status } = await axios.post('/auth/logout', { userId: userData.user._id, refreshToken: userData.refreshToken });
      if (status === 200) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        setIsLogged(false);
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    isLogged
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