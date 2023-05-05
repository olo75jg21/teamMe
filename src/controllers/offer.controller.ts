import { Request, Response } from 'express';
import { OfferModel } from '../models/offer.model';

export const handleAddOffer = async (req: Request, res: Response) => {
  try {
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
      ...(req.query.game !== '' && { game: req.query.game })
    }).populate('_user');

    res.status(201).send(offers);
  } catch (error: any) {
    console.log(error);
  }
};

export const handleGetOffer = async (req: Request, res: Response) => {
  try {
    const offerId = req.params.id;

    const offer = await OfferModel.findOne({ _id: offerId }).populate('_user');
    res.status(200).send(offer);
  } catch (error) {
    console.log(error);
  }
}

export const handleApplyOnOffer = async (req: Request, res: Response) => {
  try {
    const offerId = req.body.offerId;

    const offer = await OfferModel.findOneAndUpdate({
      _id: offerId
    }, {
      $push: {
        applicants: {
          _user: req.body.userId,
          status: 'pending'
        }
      }
    });

    res.status(200).send(offer);
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllUserOffers = async (req: Request, res: Response) => {
  try {
    const userId = req.query?.userId;

    const offers = await OfferModel.find({ _user: userId })

    res.status(200).send(offers);
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllUserApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.query?.userId;

    const offers = await OfferModel.find({
      'applicants._user': userId
    });

    res.status(200).send(offers);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};