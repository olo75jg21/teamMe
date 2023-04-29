import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../../../plugins/axios';
import { IOffer } from '../../../types/offer';

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
        console.log(e);
      }
    })();
  }, [])

  const avilableSlots = offer ? offer.applicants.reduce((count, applicant) => {
    if (applicant.status === 'accepted') {
      return count + 1;
    } else {
      return count;
    }
  }, 0) : 0;

  const handleApplyOnOffer = async (): Promise<void> => {
    try {
      // Get current logged user data
      const response = await axios.post('/offer/apply', { userId: offer._user, offerId: offer._id });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (offer &&

    <div className='bg-gray-700 h-screen flex justify-center items-center pb-48' >
      <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-800 w-3/4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <img
              className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-violet-500"
              src="https://via.placeholder.com/150"
              alt="Profile picture"
            />
            <div>
              <p className="text-gray-100 font-bold">{offer._user.username}</p>
              <p className="text-gray-300 text-sm font-semibold">{`${offer.game} ${offer.rank}`}</p>
            </div>
          </div>
          <div className="bg-violet-600 text-white font-semibold py-2 px-4 rounded">
            {`Available slots: ${avilableSlots} / ${offer.slots}`}
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
        <div className="mt-6 flex justify-between">
          <div>
            <NavLink
              className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded"
              to={`/`}
            >
              Go Back
            </NavLink>
          </div>
          <div>
            <button
              className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleApplyOnOffer}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferDetailsCard;