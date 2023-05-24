import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../plugins/axios";
import { ITeam } from "../../../../types/team";

import TeamDetailsCardHeader from "./TeamDetailsCardHeader";
import TeamDetailsCardContent from "./TeamDetailsCardContent";
import TeamDetailsCardBadges from "./TeamDetailsCardBadges";
import TeamDetailsCardFooter from "./TeamDetailsCardFooter";
import TeamDetailsCardApplicantsList from "./TeamDetailsCardApplicantsList";
import useGetLoggedUserData from "../../../../hooks/useGetLoggedUserData";
import axiosInstance from "../../../../plugins/axios";

const TeamDetailsCard = (): JSX.Element => {
  const [team, setTeam] = useState<ITeam>(null!);

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
  }, []);

  const handleUpdateTeam = async (updatedTeam: ITeam) => {
    try {
      const { status } = await axiosInstance.put(`/team/${team._id}`, {
        updatedTeam,
      });

      // @TODO if status is ok do smth
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatusOfApplication = async (
    applicantId: string,
    newStatus: string
  ) => {
    const updatedApplicants = team.applicants.map((applicant) => {
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
    if (
      team.slots ===
      team.applicants.filter((obj) => obj.status === "accepted").length
    ) {
      return true; // Disable the button if all slots are filled
    }

    if (userData.user._id) {
      if (userData.user._id === team._user._id) {
        return true; // Disable the button for the creator of the offer
      }

      return team.applicants.some((obj) => obj._user._id === userData.user._id);
    }

    return true; // Disable the button if the user is not authenticated
  };

  const isApplicantsListVisible = () => userData.user._id === team._user._id;

  const applyButtonText = (): string => {
    if (userData.user._id) {
      if (userData.user._id === team._user._id) {
        return "Your team";
      }
      return team.applicants.some((obj) => obj._user._id === userData.user._id)
        ? "Already applied"
        : "Apply";
    }

    return "Login to apply";
  };

  const isRemoveTeamBtnVisible = () => {
    return team._user._id.toString() === userData.user._id;
  };

  return (
    team && (
      <div className="flex h-screen items-center justify-center bg-gray-800">
        <div className="w-3/4 rounded-lg border border-gray-800 bg-gray-700 p-6 shadow-md">
          <TeamDetailsCardHeader team={team} />

          <TeamDetailsCardContent
            game={team.game}
            title={team.title}
            description={team.description}
          />

          <TeamDetailsCardBadges
            minAge={team.minAge}
            maxAge={team.maxAge}
            teamType={team.teamType}
            isActive={team.isActive}
          />

          {isApplicantsListVisible() && team.applicants.length !== 0 && (
            <TeamDetailsCardApplicantsList
              applicants={team.applicants}
              handleUpdateStatusOfApplication={handleUpdateStatusOfApplication}
            />
          )}

          <TeamDetailsCardFooter
            isApplyButtonDisabled={isApplyButtonDisabled()}
            isRemoveTeamBtnVisible={isRemoveTeamBtnVisible()}
            applyButtonText={applyButtonText()}
            _id={team._id}
          />
        </div>
      </div>
    )
  );
};

export default TeamDetailsCard;
