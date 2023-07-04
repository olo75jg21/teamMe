import { ITeam } from "../../../types/team";
import TableHeader from "../header/TableHeader";
import TeamsTableRow from "./TeamsTableRow";

interface UsersListProps {
  teams: ITeam[];
  removeTeam: (id: string) => void;
  handleChangeActiveState: (id: string) => void;
  changeTeamVisibility: (id: string) => void;
}

const TeamsTable: React.FC<UsersListProps> = ({
  teams,
  removeTeam,
  handleChangeActiveState,
  changeTeamVisibility,
}) => {
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
      return (
        <TeamsTableRow
          key={team._id}
          team={team}
          removeTeam={removeTeam}
          handleChangeActiveState={handleChangeActiveState}
          changeTeamVisibility={changeTeamVisibility}
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

export default TeamsTable;
