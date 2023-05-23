import { ITeam } from '../../../../types/team';
import { calculateUserRank } from '../../../../utils/calculateUserRank';
import { renderProperGameName } from '../../../../utils/renderProperGameName';

interface TeamDetailsCardHeaderProps {
  team: ITeam;
}

const TeamDetailsCardHeader = ({ team }: TeamDetailsCardHeaderProps): JSX.Element => {
  const avilableSlots = team.applicants.reduce((count, applicant) => {
    if (applicant.status === 'accepted') {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  const userGameRank = calculateUserRank(team);

  return (
    team &&
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <img
          className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-violet-500"
          src="https://via.placeholder.com/150"
          alt="Profile picture"
        />
        <div>
          <p className="text-gray-100 font-bold">{team._user.username}</p>
          <p className="text-gray-300 text-sm font-semibold">{`${renderProperGameName(userGameRank.game)} ${userGameRank.rank}`}</p>
        </div>
      </div>
      <div className="bg-violet-600 text-white font-semibold py-2 px-4 rounded">
        {`Available slots: ${avilableSlots} / ${team.slots}`}
      </div>
    </div>
  );
};

export default TeamDetailsCardHeader;