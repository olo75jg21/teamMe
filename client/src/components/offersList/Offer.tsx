import { useState, useEffect } from 'react';
import axios from '../../plugins/axios';
import { renderPassedDays } from './landingUtils';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import { fetchSingleUser } from '../../utils/fetchingUserData';

export interface IOffer {
  _id: string;
  _user: string;
  createdAt: string;
  // updatedAt: string;
  title: string;
  description: string;
  game: string;
  rank: string;
};

export const Offer = ({ _id, _user, title, game, description, rank, createdAt }: IOffer): JSX.Element => {
  const [creator, setCreator] = useState<any>('');

  const { userData } = useGetLoggedUserData()
  // const [isLogged] = useState(!!(localStorage.getItem('accessToken')));

  const userId = userData.user._id;
  const token = userData.accessToken;


  useEffect(() => {
    (async () => {
      const res = await axios.get('/users/getOneUser/' + _user);
      setCreator(res.data);
    })();
  }, []);

  const handleApplyOnOffer = async () => {
    try {
      // Get current logged user data
      const me = await fetchSingleUser(userId, token);
      // console.log(me);

      const response = await axios.post('/offer/apply', { userId, offerId: _id });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border p-5 rounded-sm">
      <div>
        <div className="flex">
          <div className="p-2 w-12 h-12 border rounded">
            <img src={game === "League of legends" ? require("../../img/lol_logo.png") : null} alt="GI" className="" />
          </div>

          <div className="text-md font-semibold p-2 w-80 mx-6">
            {title}
          </div>

        </div>
        <div className="text-sm mt-2">{description}</div>

        <div className="flex justify-between text-sm mt-2">
          <div>
            <p>Created by: {creator.email}</p>
          </div>
          <div>
            {renderPassedDays(createdAt)}
          </div>

          <div>
            <button onClick={handleApplyOnOffer}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};