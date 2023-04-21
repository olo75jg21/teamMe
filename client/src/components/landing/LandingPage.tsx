import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import { IOffer } from '../../types/offer';
import Header from '../header/Header';
import { OffersList } from '../offersList/OffersList';
import { AsidePanel } from './AsidePanel';

const LandingPage = (): JSX.Element => {
  const [filters, setFilters] = useState({ title: '', ageMin: 0, ageMax: 100, game: '', rank: '' });
  const [offers, setOffers] = useState<IOffer[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { title, ageMin, ageMax, game, rank } = filters;

        const res = await axios.get('/offer/getAll', {
          params: {
            title,
            ageMin,
            ageMax,
            game,
            rank,
          }
        });
        console.log(filters);
        setOffers(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Header />
      <div>
        <div className='flex flex-row'>
          <div className='basis-1/4'>
            <AsidePanel onFilterChange={handleFilterChange} />
          </div>
          <div className='basis-3/4'>
            {offers && <OffersList offers={offers} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;