import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { AddOfferForm } from './AddOfferForm';

export const AddOfferPage = (): JSX.Element => {
  const [cookies] = useCookies(['credentials'])
  const userId = cookies.credentials?.user._id;
  const [ offers, setOffers ] = useState<any[]>([]);

  useEffect(() => {
    (() => {
      axios.get('/offer/getAll')
      .then((res) => {
        console.log(res.data);
        setOffers(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
    })();
  }, []);

  return (
    <div className='bg-slate-200 flex h-screen'>
      <div className='m-auto'>
        <AddOfferForm userId={userId} />
      </div>
    </div>    
  )
};