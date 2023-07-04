import { Link } from "react-router-dom";
import { ITeam } from "../../../types/team";

interface Props {
  team: ITeam;
  acceptTeam: (id: string) => void;
  rejectTeam: (id: string) => void;
}

const PendingTeamsRow: React.FC<Props> = ({ team, acceptTeam, rejectTeam }) => {
  const { _id, _user, name, game } = team;

  const handleAcceptTeam = () => {
    acceptTeam(_id);
  };

  const handleRejectTeam = () => {
    rejectTeam(_id);
  };

  const renderGoToDetailsButton = (): JSX.Element => {
    return (
      <Link
        className="whitespace-nowrap font-medium text-gray-900 duration-200 hover:scale-110 dark:text-white"
        to={`/teamDetails/${_id}`}
        target="_blank"
        rel="noreferrer"
      >
        Details
      </Link>
    );
  };

  const renderAcceptTeamButton = (): JSX.Element => {
    return (
      <button
        className="whitespace-nowrap font-medium text-gray-900 duration-200 hover:scale-110 dark:text-white"
        onClick={handleAcceptTeam}
      >
        Accept
      </button>
    );
  };

  const renderRejectjTeamButton = (): JSX.Element => {
    return (
      <button
        className="whitespace-nowrap font-medium text-gray-900 duration-200 hover:scale-110 dark:text-white"
        onClick={handleRejectTeam}
      >
        Reject
      </button>
    );
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        {_user.username}
      </th>
      <td className="px-4 py-3">{name}</td>
      <td className="px-4 py-3">{game}</td>
      <td className="w-16 py-3">{renderGoToDetailsButton()}</td>
      <td className="w-16 py-3">{renderAcceptTeamButton()}</td>
      <td className="w-16 py-3">{renderRejectjTeamButton()}</td>
    </tr>
  );
};

export default PendingTeamsRow;
