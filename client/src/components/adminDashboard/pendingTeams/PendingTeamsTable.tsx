import { ITeam } from "../../../types/team";
import TableHeader from "../header/TableHeader";
import PendingTeamsRow from "./PendingTeamsRow";

interface UsersListProps {
  teams: ITeam[];
  acceptTeam: (id: string) => void;
  rejectTeam: (id: string) => void;
}

const PendingTeamsTable: React.FC<UsersListProps> = ({
  teams,
  acceptTeam,
  rejectTeam,
}) => {
  const headerItems = ["Creator", "Name", "Game", "", "", ""];

  const renderTeamsTableBody = (): JSX.Element[] => {
    if (!teams) return [];
    return teams.map((team: ITeam) => {
      return (
        <PendingTeamsRow
          key={team._id}
          team={team}
          acceptTeam={acceptTeam}
          rejectTeam={rejectTeam}
        />
      );
    });
  };

  return (
    <div>
      <div className="mt-4 overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <TableHeader headerItems={headerItems} />
          <tbody>{renderTeamsTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingTeamsTable;
