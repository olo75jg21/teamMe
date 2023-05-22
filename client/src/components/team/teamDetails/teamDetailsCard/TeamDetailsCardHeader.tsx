import { Applicant } from '../../../../types/offer';

interface IUserGameDetails {
  game: string,
  rank: string
}

interface OfferDetailsCardHeaderProps {
  username: string;
  userGameDetails: IUserGameDetails;
  applicants: Applicant[];
  slots: number;
}

const TeamDetailsCardHeader = ({ username, userGameDetails, applicants, slots }: OfferDetailsCardHeaderProps): JSX.Element => {
  const avilableSlots = applicants.reduce((count, applicant) => {
    if (applicant.status === 'accepted') {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <img
          className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-violet-500"
          src="https://via.placeholder.com/150"
          alt="Profile picture"
        />
        <div>
          <p className="text-gray-100 font-bold">{username}</p>
          <p className="text-gray-300 text-sm font-semibold">{`${userGameDetails.game.charAt(0).toUpperCase() + userGameDetails.game.slice(1)} ${userGameDetails.rank}`}</p>
        </div>
      </div>
      <div className="bg-violet-600 text-white font-semibold py-2 px-4 rounded">
        {`Available slots: ${avilableSlots} / ${slots}`}
      </div>
    </div>
  );
};

export default TeamDetailsCardHeader;