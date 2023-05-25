import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../../plugins/axios";
import useGetLoggedUserData from "../../../../hooks/useGetLoggedUserData";
import { AxiosError } from "axios";
import { useState } from "react";
import axiosInstance from "../../../../plugins/axios";
import { ITeam } from "../../../../types/team";

interface TeamDetailsCardFooterProps {
  applyButtonText: string;
  isApplyButtonDisabled: boolean;
  isRemoveTeamBtnVisible: boolean;
  team: ITeam;
}

const TeamDetailsCardFooter = ({
  isApplyButtonDisabled,
  applyButtonText,
  isRemoveTeamBtnVisible,
  team,
}: TeamDetailsCardFooterProps): JSX.Element => {
  const navigate = useNavigate();

  const { userData } = useGetLoggedUserData();

  // @TODO handle this
  const [responseError, setResponseError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = userData.user._id;

  const handleApplyToTeam = async () => {
    try {
      if (userId) {
        // Get current logged user data
        const { status } = await axios.post(`/team/apply`, {
          userId,
          teamId: team._id,
        });

        if (status === 200) {
          navigate("/account");
        }
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status !== 200) console.log(e);
    }
  };

  const handleRemoveTeam = async () => {
    try {
      const { status } = await axiosInstance.delete(`/team/${team._id}`);
      if (status === 200) {
        navigate("/account");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isUserApplicant = team.applicants.some(
    (obj: any) =>
      obj._user._id === userData.user._id && obj.status === "accepted"
  );

  const isUserCreator = team._user._id === userData.user._id;

  const isChatButtonVisible = () => {
    if (userData.accessToken === "") return false;
    return isUserApplicant || isUserCreator;
  };

  return (
    <div className="mt-6 flex justify-between">
      <div>
        <NavLink
          className="rounded bg-violet-600 px-4 py-2 font-bold text-white duration-200 hover:bg-violet-800"
          to={`/`}
        >
          Go Back
        </NavLink>
      </div>
      <div className="flex flex-row">
        {isChatButtonVisible() && (
          <NavLink
            className="mr-2 rounded bg-violet-600 px-4 py-2 font-bold text-white duration-200 hover:bg-violet-800"
            to={`/teamChat/${team._id}`}
          >
            Chat
          </NavLink>
        )}
        {isRemoveTeamBtnVisible && (
          <div className="ml-4 rounded bg-violet-600 px-4 py-2 font-bold text-white duration-200 hover:bg-violet-800 disabled:bg-gray-900">
            <button onClick={handleRemoveTeam}>Remove team</button>
          </div>
        )}
        <div>
          <button
            className="ml-4 rounded bg-violet-600 px-4 py-2 font-bold text-white duration-200 hover:bg-violet-800 disabled:bg-gray-800"
            onClick={handleApplyToTeam}
            disabled={isApplyButtonDisabled}
          >
            {applyButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsCardFooter;
