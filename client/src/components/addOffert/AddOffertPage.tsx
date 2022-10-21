import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { AddOffertForm } from './AddOffertForm';

const AddOffertPage = (): JSX.Element => {
  const [cookies] = useCookies(['credentials'])
  const userId = cookies.credentials?.user._id;
  const [ offers, setOffers ] = useState<any[]>([]);

  useEffect(() => {
    (() => {
      axios.get('/offert/getAll')
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
        <AddOffertForm userId={userId} />
      </div>
    </div>    
  )
};

export default AddOffertPage;