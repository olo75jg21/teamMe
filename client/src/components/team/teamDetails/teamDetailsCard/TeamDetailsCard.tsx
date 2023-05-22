import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../plugins/axios';
import { IOffer } from '../../../../types/offer';

import TeamDetailsCardHeader from './TeamDetailsCardHeader';
import TeamDetailsCardContent from './TeamDetailsCardContent';
import TeamDetailsCardBadges from './TeamDetailsCardBadges';
import TeamDetailsCardFooter from './TeamDetailsCardFooter';
import TeamDetailsCardApplicantsList from './TeamDetailsCardApplicantsList';
import useGetLoggedUserData from '../../../../hooks/useGetLoggedUserData';
import axiosInstance from '../../../../plugins/axios';

const TeamDetailsCard = (): JSX.Element => {
  const [offer, setOffer] = useState<IOffer>(null!);
  // const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState<boolean>(false);

  let { id } = useParams();

  const { userData } = useGetLoggedUserData();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/team/${id}`);

        setOffer(data);
        // isApplyButtonDisabledFunc()
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])

  const handleUpdateOffer = async (updatedOffer: IOffer) => {
    try {
      const { status } = await axiosInstance.put(`/team/${offer._id}`, { updatedOffer });

      // @TODO if status is ok do smth
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatusOfApplication = async (applicantId: string, newStatus: string) => {
    const updatedApplicants = offer.applicants.map(applicant => {
      if (applicant._id === applicantId) {
        return { ...applicant, status: newStatus };
      }
      return applicant;
    });

    const updatedOffer = { ...offer, applicants: updatedApplicants };

    setOffer(updatedOffer);

    await handleUpdateOffer(updatedOffer);
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
        <TeamDetailsCardHeader
          username={offer._user.username}
          applicants={offer.applicants}
          slots={offer.slots}
          userGameDetails={calculateUserRank()}
        />

        <TeamDetailsCardContent
          title={offer.title}
          description={offer.description}
        />

        <TeamDetailsCardBadges
          minAge={offer.minAge}
          maxAge={offer.maxAge}
          teamType={offer.teamType}
          isActive={offer.isActive}
        />

        {
          isApplicantsListVisible() && offer.applicants.length !== 0 &&
          <TeamDetailsCardApplicantsList
            applicants={offer.applicants}
            handleUpdateStatusOfApplication={handleUpdateStatusOfApplication}
          />
        }

        <TeamDetailsCardFooter
          isApplyButtonDisabled={isApplyButtonDisabled()}
          applyButtonText={applyButtonText()}
          _id={offer._id}
        />
      </div>
    </div>
  );
}

export default TeamDetailsCard;