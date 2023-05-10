import { NavLink } from 'react-router-dom';
import axios from '../../../../plugins/axios';
import useGetLoggedUserData from '../../../../hooks/useGetLoggedUserData';

interface OfferDetailsCardFooterProps {
  _id: string;
}

const OfferDetailsCardFooter = ({ _id }: OfferDetailsCardFooterProps): JSX.Element => {
  const { userData } = useGetLoggedUserData();

  const userId = userData.user._id;

  const handleApplyOnOffer = async () => {
    try {
      if (userId) {
        // Get current logged user data
        const response = await axios.post(`/offers/apply`, { userId, offerId: _id });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
  );
};

export default OfferDetailsCardFooter;