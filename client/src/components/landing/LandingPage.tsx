import { useCookies } from 'react-cookie';

import { OffersList } from './OffersList';

const LandingPage = (): JSX.Element => {
  const [cookies, setCookies] = useCookies(['credentials']);

  return (
    <div className="bg-slate-50 flex h-fit">
      <div className='m-auto'>
        <OffersList />
      </div>
    </div>
  );
};

export default LandingPage;


    // Get request with setting up header
    // axios.get('/users/getAllUsers', {
    //   headers: {
    //     'Authorization': 'Bearer ' + cookies.credentials.token
    //   }
    // }).then(res => [
    //   console.log(res.data)
    // ]).catch((e: any) => {
    //   console.log(e);
    // });