interface OfferDetailsCardBadgesProps {
  minAge: number;
  maxAge: number;
  offerType: string;
}

const OfferDetailsCardBadges = ({ minAge, maxAge, offerType }: OfferDetailsCardBadgesProps): JSX.Element => {
  const renderOfferType = (): JSX.Element => {
    if (offerType === 'solo') {
      return (
        <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md">
          Solo player looking for team
        </span>
      );
    }

    return (
      <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md">
        Team looking for players
      </span>
    );
  };


  return (
    <>
      <span className="px-2 p-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-md">
        {`Age ${minAge} - ${maxAge}`}
      </span>
      {renderOfferType()}
    </>
  );
};

export default OfferDetailsCardBadges;