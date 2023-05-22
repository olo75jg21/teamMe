import { NavLink } from 'react-router-dom';

import { HeaderItem } from './HeaderItem';
import { LogoutButton } from './LogoutButton';

const Header = (): JSX.Element => {
  return (
    <div className='top-0 sticky'>
      <nav className='bg-gradient-to-r from-violet-700 to-violet-500'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
          <NavLink to='/' className='text-slate-100 tracking-widest text-4xl font-bold font-mono'>TeamMe</NavLink>
          <div className='w-full md:block md:w-auto'>
            <ul className='flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium 
              md:border-0 hover:text-slate-50'
            >
              <HeaderItem route={'/account'} text={'Account'} />
              <HeaderItem route={'/newteam'} text={'New Team'} />

              <LogoutButton />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;