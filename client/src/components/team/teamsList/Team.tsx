import { useState } from 'react';
// import { renderPassedDays } from './landingUtils';
import { ITeam } from '../../../types/team';
import { NavLink } from 'react-router-dom';
import useGetLoggedUserData from '../../../hooks/useGetLoggedUserData';
import { renderProperGameName } from '../../../utils/renderProperGameName';
import { calculateUserRank } from '../../../utils/calculateUserRank';

export interface ITeamProps {
  team: ITeam
};

const Team = ({ team }: ITeamProps): JSX.Element => {
  const [creator, setCreator] = useState<any>('');
  const { userData } = useGetLoggedUserData();

  const { _id, _user, game, rank, title, description, applicants, slots } = team;

  const avilableSlots = applicants.reduce((count, applicant) => {
    if (applicant.status === 'accepted') {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  const isChatButtonVisible = () => {
    // @TODO check why we have to check for _user, not for _user._id
    return (team.applicants.some((obj => obj._user.toString() === userData.user._id && obj.status === 'accepted')) || _user.toString() === userData.user._id);
  };

  const userGameRank = calculateUserRank(team);

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-6 border-1 border-gray-900 mb-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <img
            className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-violet-500"
            src="https://via.placeholder.com/150"
            alt="Profile picture"
          />
          <div>
            <p className="text-gray-100 font-bold">{_user.username}</p>
            <p className="text-gray-300 text-sm font-semibold">{`${renderProperGameName(userGameRank.game)} ${userGameRank.rank}`}</p>
          </div>
        </div>
        <div className="bg-violet-600 text-white font-semibold py-2 px-4 rounded">
          {`Avilable slots: ${avilableSlots} / ${slots}`}
        </div>
      </div>
      <div className="mt-5">
        <p className='text-gray-200 text-xl font-bold'>Title:</p>
        <p className="text-gray-300 text-md truncate">
          {title}
        </p>
      </div>
      <div className="mt-3">
        <p className='text-gray-200 text-xl font-semibold'>Description:</p>
        <p className="text-gray-300 text-md truncate">
          {description}
        </p>
      </div>
      <div className="mt-6 flex justify-end">
        <div>
          {
            isChatButtonVisible() && <NavLink
              className='bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 mr-2 rounded'
              to={`/teamChat/${_id}`}
            >
              Chat
            </NavLink>
          }
          <NavLink
            className='bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded'
            to={`/teamDetails/${_id}`}
          >
            Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Team;