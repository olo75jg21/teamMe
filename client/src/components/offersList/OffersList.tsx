import { IOffer } from '../../types/offer';
import { Offer } from './Offer';

interface Props {
  offers: IOffer[]
}

export const OffersList = ({ offers }: Props) => {

  const renderOffers = (): JSX.Element[] => {
    return offers.map(({ _id, _user, title, game, description, rank, createdAt }) => {
      return (
        <Offer
          key={_id}
          _id={_id}
          _user={_user}
          title={title}
          game={game}
          description={description}
          rank={rank}
          createdAt={createdAt}
        />
      );
    });
  };

  return (
    <div className='p-5'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        {offers && renderOffers()}
      </div>
    </div>
  );
};