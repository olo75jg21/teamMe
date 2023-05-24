import { renderProperGameName } from "../../../../utils/renderProperGameName";

interface TeamDetailsCardContentProps {
  game: string;
  title: string;
  description: string;
}

const TeamDetailsCardContent = ({
  game,
  title,
  description,
}: TeamDetailsCardContentProps): JSX.Element => {
  return (
    <>
      <div className="mt-5">
        <p className="text-xl font-bold text-gray-200">Game:</p>
        <p className="text-md text-gray-300">{renderProperGameName(game)}</p>
      </div>
      <div className="my-3">
        <p className="text-xl font-bold text-gray-200">Title:</p>
        <p className="text-md text-gray-300">{title}</p>
      </div>
      <div className="my-3">
        <p className="text-xl font-bold text-gray-200">Description:</p>
        <p className="text-md text-gray-300">{description}</p>
      </div>
    </>
  );
};

export default TeamDetailsCardContent;
