import { IOffer } from '../../../types/offer';
import Team from './Team';

interface Props {
  offers: IOffer[]
}

const TeamsList = ({ offers }: Props) => {
  const renderOffers = (): JSX.Element[] => {
    return offers.map((offer: IOffer) => {
      return (
        <Team
          key={offer._id}
          offer={offer}
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

export default TeamsList;