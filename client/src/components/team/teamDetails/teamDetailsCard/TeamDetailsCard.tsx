import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../plugins/axios';
import { ITeam } from '../../../../types/team';

import TeamDetailsCardHeader from './TeamDetailsCardHeader';
import TeamDetailsCardContent from './TeamDetailsCardContent';
import TeamDetailsCardBadges from './TeamDetailsCardBadges';
import TeamDetailsCardFooter from './TeamDetailsCardFooter';
import TeamDetailsCardApplicantsList from './TeamDetailsCardApplicantsList';
import useGetLoggedUserData from '../../../../hooks/useGetLoggedUserData';
import axiosInstance from '../../../../plugins/axios';

const TeamDetailsCard = (): JSX.Element => {
  const [team, setTeam] = useState<ITeam>(null!);
  // const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState<boolean>(false);

  let { id } = useParams();

  const { userData } = useGetLoggedUserData();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/team/${id}`);

        setTeam(data);
        // isApplyButtonDisabledFunc()
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])

  const handleUpdateTeam = async (updatedTeam: ITeam) => {
    try {
      const { status } = await axiosInstance.put(`/team/${team._id}`, { updatedTeam });

      // @TODO if status is ok do smth
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatusOfApplication = async (applicantId: string, newStatus: string) => {
    const updatedApplicants = team.applicants.map(applicant => {
      if (applicant._id === applicantId) {
        return { ...applicant, status: newStatus };
      }
      return applicant;
    });

    const updatedTeam = { ...team, applicants: updatedApplicants };

    setTeam(updatedTeam);

    await handleUpdateTeam(updatedTeam);
  };

  const isApplyButtonDisabled = (): boolean => {
    if (userData.user._id) {
      if (userData.user._id === team._user._id) {
        return true;
      }
      return team.applicants.some((obj => obj._user._id === userData.user._id))
    }

    return true
  };

  const isApplicantsListVisible = () => userData.user._id === team._user._id;

  const applyButtonText = (): string => {
    if (userData.user._id) {
      if (userData.user._id === team._user._id) {
        return 'Your team';
      }
      return team.applicants.some((obj => obj._user._id === userData.user._id)) ? 'Already applied' : 'Apply';
    }

    return 'Login to apply';
  };

  // @TODO checks if this works after handling editing user profile
  const calculateUserRank = (): { game: string, rank: string } => {
    team._user.games.forEach((game) => {
      if (game.name === team.game) {
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

  return (team &&
    <div className='bg-gray-800 h-screen flex justify-center items-center' >
      <div className="bg-gray-700 rounded-lg shadow-md p-6 border border-gray-800 w-3/4">
        <TeamDetailsCardHeader
          username={team._user.username}
          applicants={team.applicants}
          slots={team.slots}
          userGameDetails={calculateUserRank()}
        />

        <TeamDetailsCardContent
          title={team.title}
          description={team.description}
        />

        <TeamDetailsCardBadges
          minAge={team.minAge}
          maxAge={team.maxAge}
          teamType={team.teamType}
          isActive={team.isActive}
        />

        {
          isApplicantsListVisible() && team.applicants.length !== 0 &&
          <TeamDetailsCardApplicantsList
            applicants={team.applicants}
            handleUpdateStatusOfApplication={handleUpdateStatusOfApplication}
          />
        }

        <TeamDetailsCardFooter
          isApplyButtonDisabled={isApplyButtonDisabled()}
          applyButtonText={applyButtonText()}
          _id={team._id}
        />
      </div>
    </div>
  );
}

export default TeamDetailsCard;