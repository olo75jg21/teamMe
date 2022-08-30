import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { LogoutButton } from './LogoutButton';
import { useEffect } from 'react';

const Header = (): JSX.Element => {
  const [cookies, setCookies] = useCookies(['credentials']);

  let user;
  cookies.credentials !== undefined ? user = cookies.credentials.user : user = '';

  return (
    <div className='top-0 sticky'>
      <nav className='bg-gradient-to-r from-sky-600 to-indigo-600 rounded-b-md'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
          <NavLink to='/' className='text-slate-100 tracking-widest text-4xl font-bold font-mono'>TeamMe</NavLink>
          <div className='w-full md:block md:w-auto'>
            <ul className='flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium 
              md:border-0 hover:text-slate-50'
            >
              <li>
                <NavLink to={!user ? "/login" : "/account"} className="block py-2 pr-4 pl-3 text-slate-300 text-xl 
                  text-gray-400 hover:underline hover:underline-offset-8 duration-200 md:p-2 
                  hover:text-white md:hover:bg-transparent"
                >
                  Account
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="block py-2 pr-4 pl-3 text-slate-300 text-xl text-gray-400
                  hover:underline hover:underline-offset-8 duration-200 md:p-2 
                  hover:text-white md:hover:bg-transparent"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to={!user ? "/login" : "/account"} className="block py-2 pr-4 pl-3 text-slate-300 text-xl text-gray-400
                  hover:underline hover:underline-offset-8 duration-200 md:p-2 
                  hover:text-white md:hover:bg-transparent"
                >
                  New Offert
                </NavLink>
              </li>
              {
                user !== ''
                  ? <LogoutButton />
                  : <></>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;