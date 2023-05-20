import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import { IOffer } from '../../types/offer';
import Header from '../header/Header';
import { OffersList } from '../offer/offersList/OffersList';
import { AsidePanel } from './AsidePanel';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import AddNewOfferButton from './AddNewOfferButton';

const LandingPage = (): JSX.Element => {
  const [filters, setFilters] = useState({ title: '', ageMin: 16, ageMax: 100, game: '', gender: '' });
  const [offers, setOffers] = useState<IOffer[]>([]);

  const { userData } = useGetLoggedUserData();

  useEffect(() => {
    (async () => {
      try {
        const { title, ageMin, ageMax, game, gender } = filters;

        const res = await axios.get('/offers', {
          params: {
            title,
            ageMin,
            ageMax,
            game,
            gender,
            userId: userData.user._id,
          }
        });
        setOffers(res.data);
      } catch (e) {
        console.error(e);
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
        <div className={`flex flex-row bg-gray-800 ${offers.length <= 4 ? 'h-screen' : 'h-full'}`}>
          <div className='basis-1/4'>
            <AddNewOfferButton />
            <AsidePanel onFilterChange={handleFilterChange} />
          </div>
          <div className='basis-3/4'>
            <div className='p-5 mt-20'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6'>
                {offers && <OffersList offers={offers} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;