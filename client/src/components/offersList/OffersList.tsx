import { application } from 'express';
import { IOffer } from '../../types/offer';
import { Offer } from './Offer';

interface Props {
  offers: IOffer[]
}

export const OffersList = ({ offers }: Props) => {
  const renderOffers = (): JSX.Element[] => {
    return offers.map((offer: IOffer) => {
      return (
        <Offer
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