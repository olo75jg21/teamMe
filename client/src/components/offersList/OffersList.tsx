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
    <>
      {offers && renderOffers()}
    </>
  );
};