import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export interface HeaderItemProps {
  route: string;
  text: string;
};

export const HeaderItem = ({ route, text }: HeaderItemProps): JSX.Element => {
  const [cookies] = useCookies(['credentials']);

  const user = cookies.credentials?.user;

  return (
    <div>
      <li>
        <NavLink to={!user ? "/login" : `${route}`} className="block py-2 pr-4 pl-3 text-slate-300 text-xl 
          text-gray-400 hover:underline hover:underline-offset-8 duration-200 md:p-2 
          hover:text-white md:hover:bg-transparent"
        >
          {text}
        </NavLink>
      </li>
    </div>
  );
};