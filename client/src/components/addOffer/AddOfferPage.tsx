import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { AddOfferForm } from './AddOfferForm';

export const AddOfferPage = (): JSX.Element => {
  const [cookies] = useCookies(['credentials'])
  const userId = cookies.credentials?.user._id;

  const navigate = useNavigate();

  if (!userId) {
    navigate('/login');
  }

  return (
    <div className='bg-slate-200 flex h-screen'>
      <div className='m-auto'>
        <AddOfferForm userId={userId} />

      </div>
    </div>
  )
};