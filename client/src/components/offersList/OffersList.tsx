import axios from '../../plugins/axios';
import { useState, useEffect } from 'react';

import { Offer } from './Offer';

export const OffersList = () => {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/offer/getAll');
        setOffers(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const renderOffers = (): JSX.Element[] => {
    return offers.map(({ _id, _user, title, game, description, rank, createdAt }) => {
      return (
        <Offer
          key={_id}
          _user={_user}
          title={title}
          game={game}
          description={description}
          rank={rank}
          createdAt={createdAt}
        />
      );
    });
  };

  return (
    <div className='p-5'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
        {offers && renderOffers()}
      </div>
    </div>
  );
};