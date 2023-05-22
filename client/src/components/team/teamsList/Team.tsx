import { useState } from 'react';
// import { renderPassedDays } from './landingUtils';
import { IOffer } from '../../../types/offer';
import { NavLink } from 'react-router-dom';

export interface ITeamProps {
  offer: IOffer
};

const Team = ({ offer }: ITeamProps): JSX.Element => {
  const [creator, setCreator] = useState<any>('');

  const { _id, _user, game, rank, title, description, applicants, slots } = offer;

  const avilableSlots = applicants.reduce((count, applicant) => {
    if (applicant.status === 'accepted') {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-6 border-1 border-gray-900 mb-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <img
            className="h-14 w-14 rounded-full object-cover mr-4"
            src="https://via.placeholder.com/150"
            alt="Profile picture"
          />
          <div>
            <p className="text-gray-100 font-bold">{_user.username}</p>
            <p className="text-gray-300 text-sm font-semibold">{`${game} ${rank}`}</p>
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
          <NavLink
            className='bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 mr-2 rounded'
            to={`/offerChat/${_id}`}
          >
            Chat
          </NavLink>
          <NavLink
            className='bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded'
            to={`/offerDetails/${_id}`}
          >
            Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Team;