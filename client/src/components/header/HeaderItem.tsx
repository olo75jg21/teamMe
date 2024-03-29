import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export interface HeaderItemProps {
  route: string;
  text: string;
};

export const HeaderItem = ({ route, text }: HeaderItemProps): JSX.Element => {
  const [isLogged] = useState(!!(localStorage.getItem('accessToken')));

  return (
    <div>
      <li>
        <NavLink to={!isLogged ? "/login" : `${route}`} className="block py-2 pr-4 pl-3 text-slate-300 text-xl 
          text-gray-400 hover:underline hover:underline-offset-8 duration-200 md:p-2 
          hover:text-white md:hover:bg-transparent"
        >
          {text}
        </NavLink>
      </li>
    </div>
  );
};