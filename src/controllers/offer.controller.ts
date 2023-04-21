import { Request, Response } from 'express';
import { OfferModel } from '../models/offer.model';

export const handleAddOffer = async (req: Request, res: Response) => {
  try {
    // const { _user } = req.body;

    const offer = await OfferModel.create(req.body);

    res.status(201).send(offer);
  } catch (error: any) {
    console.log(error);
  }
};

export const handleGetAllOffers = async (req: Request, res: Response) => {
  try {
    const title = typeof req.query.title === 'string' ? req.query.title : '';

    const offers = await OfferModel.find({
      title: {
        $regex: title,
        $options: 'i'
      },

      age: req.query.minAge,

      ...(req.query.game !== '' && { game: req.query.game })
    });

    res.status(201).send(offers);
  } catch (error: any) {
    console.log(error);
  }
};

export const handleGetMyOffers = async (req: Request, res: Response) => {
  try {

    const offers = await OfferModel.find({});

    res.status(201).send(offers);
  } catch (error: any) {
    console.log(error);
  }
};