import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const LandingPage = (): JSX.Element => {
  const [cookies, setCookies] = useCookies(['credentials']);

  useEffect(() => {

  }, []);

  return (
    <div className="bg-slate-200 flex h-fit">
      <div className='m-auto'>
        <h2>Landing Page</h2>
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