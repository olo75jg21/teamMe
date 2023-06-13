interface TeamDetailsCardBadgesProps {
  minAge: number;
  maxAge: number;
  minRank: string;
  maxRank: string;
  teamType: string;
  isActive: boolean;
}

const TeamDetailsCardBadges = ({
  minAge,
  maxAge,
  minRank,
  maxRank,
  teamType,
  isActive,
}: TeamDetailsCardBadgesProps): JSX.Element => {
  const renderIsAcitve = (): JSX.Element => {
    return (
      <span
        className={`mr-2 p-1 px-2 ${
          isActive ? "bg-green-600" : "bg-red-600"
        } rounded-md text-xs font-semibold text-gray-100`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const renderAgeRange = (): JSX.Element => {
    return (
      <span className="mr-2 rounded-md bg-gray-200 p-1 px-2 text-xs font-semibold text-gray-700">
        {`Age ${minAge} - ${maxAge}`}
      </span>
    );
  };

  const renderTeamType = (): JSX.Element => {
    if (teamType === "solo") {
      return (
        <span className="rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
          Solo player looking for team
        </span>
      );
    }

    return (
      <span className="mr-2 rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
        Team looking for players
      </span>
    );
  };

  const renderRanksRange = (): JSX.Element => {
    return (
      <>
        <span className="mx-2 rounded-md bg-green-300 p-1 px-2 text-xs font-semibold text-gray-700">
          {`Lowest rank: ${minRank}`}
        </span>
        <span className="mr-2 rounded-md bg-blue-300 p-1 px-2 text-xs font-semibold text-gray-700">
          {`Highest rank: ${maxRank}`}
        </span>
      </>
    );
  };

  return (
    <>
      {renderIsAcitve()}
      {renderAgeRange()}
      {renderTeamType()}
      {renderRanksRange()}
    </>
  );
};

export default TeamDetailsCardBadges;
