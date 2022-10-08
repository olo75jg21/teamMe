import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { HeaderItem } from './HeaderItem';
import { LogoutButton } from './LogoutButton';

const Header = (): JSX.Element => {
  const [cookies] = useCookies(['credentials']);

  let user;
  cookies.credentials ? user = cookies.credentials.user : user = '';

  return (
    <div className='top-0 sticky'>
      <nav className='bg-gradient-to-r from-sky-600 to-indigo-600 rounded-b-md'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
          <NavLink to='/' className='text-slate-100 tracking-widest text-4xl font-bold font-mono'>TeamMe</NavLink>
          <div className='w-full md:block md:w-auto'>
            <ul className='flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium 
              md:border-0 hover:text-slate-50'
            >
              <HeaderItem user={user} route={'/account'} text={'Account'} /> 
              <HeaderItem user={user} route={'/contact'} text={'Contact'} />
              {/* Change '/' route later */}
              <HeaderItem user={user} route={'/'} text={'New Offert'} /> 

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