import { ITeam } from '../../../types/team';
import Team from './Team';

interface Props {
  teams: ITeam[]
}

const TeamsList = ({ teams }: Props) => {
  const renderTeams = (): JSX.Element[] => {
    return teams.map((team: ITeam) => {
      return (
        <Team
          key={team._id}
          team={team}
        />
      );
    });
  };

  return (
    <>
      {teams && renderTeams()}
    </>
  );
};

export default TeamsList;