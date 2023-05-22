interface TeamDetailsCardContentProps {
  title: string;
  description: string;
}

const TeamDetailsCardContent = ({ title, description }: TeamDetailsCardContentProps): JSX.Element => {
  return (
    <>
      <div className="mt-5">
        <p className="text-gray-200 text-xl font-bold">Title:</p>
        <p className="text-gray-300 text-md">{title}</p>
      </div>
      <div className="my-3">
        <p className="text-gray-200 text-xl font-bold">Description:</p>
        <p className="text-gray-300 text-md">{description}</p>
      </div>
    </>
  )
};

export default TeamDetailsCardContent;