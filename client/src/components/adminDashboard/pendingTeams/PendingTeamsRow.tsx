import { ITeam } from "../../../types/team";

interface Props {
  team: ITeam;
}

const PendingOffersRow: React.FC<Props> = ({ team }) => {
  const { _user, title, game, minRank } = team;

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        {_user.username}
      </th>
      <td className="px-4 py-3">{title}</td>
      <td className="px-4 py-3">{game}</td>
      <td className="px-4 py-3">{minRank}</td>
      <td className="px-4 py-3">{minRank}</td>
    </tr>
  );
};

export default PendingOffersRow;
