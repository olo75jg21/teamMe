import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../plugins/axios';
import { IOffer } from '../../../../types/offer';

import OfferDetailsCardHeader from './OfferDetailsCardHeader';
import OfferDetailsCardContent from './OfferDetailsCardContent';
import OfferDetailsCardBadges from './OfferDetailsCardBadges';
import OfferDetailsCardFooter from './OfferDetailsCardFooter';
import OfferDetailsCardApplicantsList from './OfferDetailsCardApplicantsList';
import useGetLoggedUserData from '../../../../hooks/useGetLoggedUserData';

const OfferDetailsCard = (): JSX.Element => {
  const [offer, setOffer] = useState<IOffer>(null!);
  // const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState<boolean>(false);

  let { id } = useParams();

  const { userData } = useGetLoggedUserData();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/offers/${id}`);

        setOffer(data);
        // isApplyButtonDisabledFunc()
      } catch (e) {
        console.log(e);
      }
    })();
  }, [])

  const handleAcceptUserApplication = (applicantId: string) => {
    console.log(applicantId);
  };

  const isApplyButtonDisabled = (): boolean => {
    if (userData.user._id) {
      if (userData.user._id === offer._user._id) {
        return true;
      }
      return offer.applicants.some((obj => obj._user._id === userData.user._id))
    }

    return true
  };

  const isApplicantsListVisible = () => userData.user._id === offer._user._id;

  const applyButtonText = (): string => {
    if (userData.user._id) {
      if (userData.user._id === offer._user._id) {
        return 'Your offer';
      }
      return offer.applicants.some((obj => obj._user._id === userData.user._id)) ? 'Already applied' : 'Apply';
    }

    return 'Login to apply';
  };

  // @TODO checks if this works after handling editing user profile
  const calculateUserRank = (): { game: string, rank: string } => {
    offer._user.games.forEach((game) => {
      if (game.name === offer.game) {
        return {
          game: game.name,
          rank: game.rank
        };
      }
    });

    return {
      game: 'Valorant',
      rank: 'Bronze 3'
    };
  }

  return (offer &&
    <div className='bg-gray-800 h-screen flex justify-center items-center' >
      <div className="bg-gray-700 rounded-lg shadow-md p-6 border border-gray-800 w-3/4">
        <OfferDetailsCardHeader
          username={offer._user.username}
          applicants={offer.applicants}
          slots={offer.slots}
          userGameDetails={calculateUserRank()}
        />

        <OfferDetailsCardContent
          title={offer.title}
          description={offer.description}
        />

        <OfferDetailsCardBadges
          minAge={offer.minAge}
          maxAge={offer.maxAge}
          offerType={offer.offerType}
          isActive={offer.isActive}
        />

        {
          isApplicantsListVisible() && offer.applicants.length !== 0 &&
          <OfferDetailsCardApplicantsList
            applicants={offer.applicants}
            handleAcceptUserApplication={handleAcceptUserApplication}
          />
        }

        <OfferDetailsCardFooter
          isApplyButtonDisabled={isApplyButtonDisabled()}
          applyButtonText={applyButtonText()}
          _id={offer._id}
        />
      </div>
    </div>
  );
}

export default OfferDetailsCard;