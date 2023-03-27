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
    const offers = await OfferModel.find({});

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