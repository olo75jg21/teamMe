import Header from '../header/Header';
import { OffersList } from '../offersList/OffersList';

const LandingPage = (): JSX.Element => {
  return (
    <div>
      <Header />
      <OffersList />
    </div>
  );
};

export default LandingPage;