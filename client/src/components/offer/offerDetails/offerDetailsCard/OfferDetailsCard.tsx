import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../plugins/axios';
import { IOffer } from '../../../../types/offer';

import OfferDetailsCardHeader from './OfferDetailsCardHeader';
import OfferDetailsCardContent from './OfferDetailsCardContent';
import OfferDetailsCardBadges from './OfferDetailsCardBadges';
import OfferDetailsCardFooter from './OfferDetailsCardFooter';
import OfferDetailsCardApplicantsList from './OfferDetailsCardApplicantsList';

const OfferDetailsCard = (): JSX.Element => {
  const [offer, setOffer] = useState<IOffer>(null!);

  let { id } = useParams();


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/offers/${id}`);
        console.log(data);

        setOffer(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [])


  // @TODO checks if this works after handling editing user profile
  const calculateUserRank = (): { game: string, rank: string } => {
    offer._user.games.forEach((game) => {
      if (game.name === offer.game) {
        console.log(game.rank)
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
    <div className='bg-gray-800 h-screen flex justify-center items-center pb-48' >
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
          offer.applicants.length !== 0 &&
          <OfferDetailsCardApplicantsList
            applicants={offer.applicants}
          />
        }

        <OfferDetailsCardFooter
          _id={offer._id}
        />
      </div>
    </div>
  );
}

export default OfferDetailsCard;