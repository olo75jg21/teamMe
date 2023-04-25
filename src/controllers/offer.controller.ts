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

    const userId = req.query?.userId; // or however you're getting the user ID
    const applicantsQuery = userId ? { 'applicants._user': { $nin: [userId] } } : {};

    const offers = await OfferModel.find({
      $and: [
        { _user: { $ne: userId } },
        applicantsQuery
      ],
      title: {
        $regex: title,
        $options: 'i'
      },
      // minAge: {
      //   $gte: req.query.minAge
      // },
      // maxAge: {
      //   $lte: req.params.maxAge
      // },
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

export const handleApplyOnOffer = async (req: Request, res: Response) => {
  try {
    const offer = await OfferModel.findOneAndUpdate({
      _id: req.body.offerId
    }, {
      $push: {
        applicants: {
          _user: req.body.userId,
          status: 'pending'
        }
      }
    }, {
      new: true
    });

    res.status(200).send(offer);
  } catch (error) {
    console.log(error);
  }
}

export const handleGetAllUserOffers = async (req: Request, res: Response) => {
  try {
    const userId = req.query?.userId; // or however you're getting the user ID

    const offers = await OfferModel.find({ _user: userId })

    res.status(200).send(offers);
  } catch (error) {
    console.log(error);
  }
}