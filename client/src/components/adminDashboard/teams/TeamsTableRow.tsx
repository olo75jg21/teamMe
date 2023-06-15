import { Link } from "react-router-dom";
import { ITeam } from "../../../types/team";

interface Props {
  team: ITeam;
}

const TeamsTableRow: React.FC<Props> = ({ team }) => {
  const { _id, _user, name, game, isActive, isVisible } = team;

  const renderRemoveTeamButton = (): JSX.Element => {
    return (
      <button
        className="whitespace-nowrap font-medium text-gray-900 duration-200 hover:scale-110 dark:text-white"
        onClick={() => console.log("XD")}
      >
        Delete
      </button>
    );
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

  const renderChangeActiveButton = (): JSX.Element => {
    return (
      <button
        className="whitespace-nowrap font-medium text-gray-900 duration-200 hover:scale-110 dark:text-white"
        onClick={() => console.log("XD")}
      >
        {isActive ? "Deactivate" : "Activate"}
      </button>
    );
  };

  const renderChangeVisibilityButton = (): JSX.Element => {
    return (
      <button
        className="whitespace-nowrap font-medium text-gray-900 duration-200 hover:scale-110 dark:text-white"
        onClick={() => console.log("XD")}
      >
        {isVisible ? "Hide" : "Show"}
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
      <td className="px-4 py-3">{isActive ? "true" : "false"}</td>
      <td className="px-4 py-3">{isVisible ? "true" : "false"}</td>
      <td className="w-16 py-3">{renderRemoveTeamButton()}</td>
      <td className="w-16 py-3">{renderGoToDetailsButton()}</td>
      <td className="w-24 py-3">{renderChangeActiveButton()}</td>
      <td className="w-16 py-3">{renderChangeVisibilityButton()}</td>
    </tr>
  );
};

export default TeamsTableRow;
