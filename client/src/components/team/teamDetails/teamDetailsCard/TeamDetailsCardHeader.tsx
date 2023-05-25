import useGetLoggedUserData from "../../../../hooks/useGetLoggedUserData";
import { ITeam } from "../../../../types/team";
import { calculateUserRank } from "../../../../utils/calculateUserRank";
import { renderProperGameName } from "../../../../utils/renderProperGameName";

interface TeamDetailsCardHeaderProps {
  team: ITeam;
}

const TeamDetailsCardHeader = ({
  team,
}: TeamDetailsCardHeaderProps): JSX.Element => {
  const { userData } = useGetLoggedUserData();

  const userGameRank = calculateUserRank(team);

  const takenSlots = team.applicants.reduce((count, applicant) => {
    if (applicant.status === "accepted") {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  const availableSlots = team.slots - takenSlots;

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
        className={`bg-violet-600" mr-2 rounded
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

  const isApplicationStatusVisible = () => {
    return team.applicants.some((obj) => obj._user._id === userData.user._id);
  };

  return (
    team && (
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            className="mr-4 h-16 w-16 rounded-full border-2 border-violet-500 object-cover"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <div>
            <p className="font-bold text-gray-100">{team._user.username}</p>
            <p className="text-sm font-semibold text-gray-300">{`${renderProperGameName(
              userGameRank.game
            )} ${userGameRank.rank}`}</p>
          </div>
        </div>
        <div className="flex flex-row">
          {isApplicationStatusVisible() && renderApplicationStatus()}
          {renderAvilableSlots()}
        </div>
      </div>
    )
  );
};

export default TeamDetailsCardHeader;
