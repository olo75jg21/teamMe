import { useState } from "react";
// import { renderPassedDays } from './landingUtils';
import { ITeam } from "../../../types/team";
import { NavLink } from "react-router-dom";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import { renderProperGameName } from "../../../utils/renderProperGameName";
import { calculateUserRank } from "../../../utils/calculateUserRank";

export interface ITeamProps {
  team: ITeam;
}

const Team = ({ team }: ITeamProps): JSX.Element => {
  const { userData } = useGetLoggedUserData();

  const {
    _id,
    _user,
    game,
    name,
    rank,
    title,
    description,
    applicants,
    slots,
  } = team;

  const userGameRank = calculateUserRank(team);

  const takenSlots = applicants.reduce((count, applicant) => {
    if (applicant.status === "accepted") {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  const availableSlots = slots - takenSlots;

  const isChatButtonVisible = () => {
    const isUserInApplicantsArray = applicants.some(
      (obj) => obj._user._id === userData.user._id && obj.status === "accepted"
    );

    const isUserTheCreator = team._user._id === userData.user._id;

    return isUserInApplicantsArray || isUserTheCreator;
  };

  const getApplicationStatus = (): JSX.Element | null => {
    const applicant = team.applicants.find(
      (obj) => obj._user._id === userData.user._id
    );

    if (applicant) {
      return <div className="text-white">Status: {applicant.status}</div>;
    }

    return null;
  };

  const renderApplicationStatus = () => {
    return (
      <div
        className={`"bg-violet-600" mr-2 rounded
          bg-violet-600 px-4 py-2 font-semibold text-white`}
      >
        {getApplicationStatus()}
      </div>
    );
  };

  const renderAvilableSlots = () => {
    return (
      <div
        className={`rounded bg-violet-600 ${
          availableSlots === 0 ? "bg-red-700" : "bg-violet-600"
        } px-4 py-2 font-semibold text-white`}
      >
        {`Available slots: ${availableSlots}`}
      </div>
    );
  };

  const renderOwnerData = () => {
    return (
      <div>
        <p className="font-bold text-gray-100">{_user.username}</p>
        <p className="text-sm font-semibold text-gray-300">
          {`${renderProperGameName(userGameRank.game)} ${userGameRank.rank}`}
        </p>
      </div>
    );
  };

  const renderActionButtons = () => {
    return (
      <div>
        {isChatButtonVisible() && (
          <NavLink
            className="mr-2 rounded bg-violet-600 px-4 py-2 font-bold text-white hover:bg-violet-800"
            to={`/teamChat/${_id}`}
          >
            Chat
          </NavLink>
        )}
        <NavLink
          className="rounded bg-violet-600 px-4 py-2 font-bold text-white hover:bg-violet-800"
          to={`/teamDetails/${_id}`}
        >
          Details
        </NavLink>
      </div>
    );
  };

  const isApplicationStatusVisible = () => {
    return team.applicants.some((obj) => obj._user._id === userData.user._id);
  };

  return (
    <div className="border-1 mb-2 rounded-lg border-gray-900 bg-gray-700 p-6 pt-3 shadow-md">
      <div className="mb-3">
        <p className="truncate text-2xl font-bold text-gray-300">{name}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            className="mr-4 h-16 w-16 rounded-full border-2 border-violet-500 object-cover"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          {renderOwnerData()}
        </div>
        <div className="flex flex-row">
          {isApplicationStatusVisible() && renderApplicationStatus()}
          {renderAvilableSlots()}
        </div>
      </div>
      <div className="mt-5">
        <p className=" truncate text-2xl font-bold text-gray-300">
          {renderProperGameName(game)}
        </p>
      </div>
      <div className="mt-3">
        <p className="truncate text-2xl text-gray-300">{title}</p>
      </div>
      <div className="mt-3">
        <p className="truncate text-lg text-gray-300">{description}</p>
      </div>
      <div className="mt-6 flex justify-end">{renderActionButtons()}</div>
    </div>
  );
};

export default Team;
