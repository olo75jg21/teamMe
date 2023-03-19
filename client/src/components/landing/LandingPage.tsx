import { useCookies } from 'react-cookie';

import { OffersList } from '../offersList/OffersList';

const LandingPage = (): JSX.Element => {
  const [cookies, setCookies] = useCookies(['credentials']);

  return (
    <div className="">
      <div className=''>
        <OffersList />
      </div>
    </div>
  );
};

export default LandingPage;