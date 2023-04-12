import Header from '../header/Header';
import { OffersList } from '../offersList/OffersList';
import { AsidePanel } from './AsidePanel';

const LandingPage = (): JSX.Element => {
  return (
    <div>
      <Header />
      <div>
        <div className='flex flex-row'>
          <div className='basis-1/4'>
            <AsidePanel />
          </div>
          <div className='basis-3/4'>
            <OffersList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;