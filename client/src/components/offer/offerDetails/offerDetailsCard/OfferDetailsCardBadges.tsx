interface OfferDetailsCardBadgesProps {
  minAge: number;
  maxAge: number;
  offerType: string;
  isActive: boolean;
}

const OfferDetailsCardBadges = ({ minAge, maxAge, offerType, isActive }: OfferDetailsCardBadgesProps): JSX.Element => {
  const renderIsAcitve = (): JSX.Element => {
    return (
      <span className={`mr-2 px-2 p-1 ${isActive ? 'bg-green-600' : 'bg-red-600'} text-gray-100 text-xs font-semibold rounded-md`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    )
  };

  const renderAgeRange = (): JSX.Element => {
    return (
      <span className="mr-2 px-2 p-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-md">
        {`Age ${minAge} - ${maxAge}`}
      </span>
    );
  };

  const renderOfferType = (): JSX.Element => {
    if (offerType === 'solo') {
      return (
        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md">
          Solo player looking for team
        </span>
      );
    }

    return (
      <span className="mr-2 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md">
        Team looking for players
      </span>
    );
  };

  return (
    <>
      {renderIsAcitve()}
      {renderAgeRange()}
      {renderOfferType()}
    </>
  );
};

export default OfferDetailsCardBadges;