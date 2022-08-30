import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const LandingPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.auth.user);
  const [cookies, setCookies] = useCookies(['credentials']);

  useEffect(() => {
    console.log(user);
    console.log(cookies.credentials.token);

  }, [user]);

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