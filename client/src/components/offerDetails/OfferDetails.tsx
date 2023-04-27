import Header from '../header/Header';
import OfferDetailsCard from './OfferDetailsCard';

const OfferDetails = (): JSX.Element => {
  return (
    <>
      <div>
        <Header />
        <div className='bg-gray-700 h-screen flex justify-center items-center pb-48' >
          <OfferDetailsCard />
        </div>
      </div>
    </>
  );
};

export default OfferDetails;