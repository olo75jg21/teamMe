import { ITeam } from "../../../types/team";
import TableHeader from "../header/TableHeader";
import UsersTableRow from "./PendingTeamsRow";

interface UsersListProps {
  teams: ITeam[];
}

const UsersTable: React.FC<UsersListProps> = ({ teams }) => {
  const headerItems = ["Username", "Email", "Gender", "Age", "Role", ""];

  const renderUsersTableBody = (): JSX.Element[] => {
    if (!teams) return [];
    return teams.map((team: ITeam) => {
      return <UsersTableRow key={team._id} team={team} />;
    });
  };

  return (
    <div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <TableHeader headerItems={headerItems} />
          <tbody>{renderUsersTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
