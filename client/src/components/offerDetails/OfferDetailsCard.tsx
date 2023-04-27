import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../../plugins/axios';
import { IOffer } from '../../types/offer';
import LandingPage from '../landing/LandingPage';

const OfferDetailsCard = (): JSX.Element => {
  const [offer, setOffer] = useState<IOffer>(null!);
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/offer/single', {
          params: {
            id
          }
        });

        setOffer(data[0]);
      } catch (e) {

      }
    })();
  }, [])

  return (offer &&
    <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800 w-3/4 mx-auto mt-16">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <img
            className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-violet-500"
            src="https://via.placeholder.com/150"
            alt="Profile picture"
          />
          <div>
            <p className="text-gray-100 font-bold">{offer._user}</p>
            <p className="text-gray-300 text-sm font-semibold">{`${offer.game} ${offer.rank}`}</p>
          </div>
        </div>
        <div className="bg-violet-500 text-white font-semibold py-2 px-4 rounded">
          {/* {`Available slots: ${offer.availableSlots} / ${offer.slots}`} */}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-gray-200 text-xl font-bold">Title:</p>
        <p className="text-gray-300 text-md">{offer.title}</p>
      </div>
      <div className="mt-3">
        <p className="text-gray-200 text-xl font-bold">Description:</p>
        <p className="text-gray-300 text-md">{offer.description}</p>
      </div>
      <div className="mt-6 flex justify-end">
        <div>
          <NavLink
            className="bg-violet-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to={`/offerDetails/${offer._id}`}
          >
            Details
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default OfferDetailsCard;