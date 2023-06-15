import { ITeam } from "../../../types/team";
import TableHeader from "../header/TableHeader";
import TeamsTableRow from "./TeamsTableRow";

interface UsersListProps {
  teams: ITeam[];
}

const TeamsTable: React.FC<UsersListProps> = ({ teams }) => {
  const headerItems = [
    "Creator",
    "Name",
    "Game",
    "Active",
    "Visible",
    "",
    "",
    "",
    "",
  ];

  const renderTeamsTableBody = (): JSX.Element[] => {
    if (!teams) return [];
    return teams.map((team: ITeam) => {
      return <TeamsTableRow key={team._id} team={team} />;
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

export default TeamsTable;
