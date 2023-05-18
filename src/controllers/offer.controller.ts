import { Request, Response } from 'express';
import { OfferModel } from '../models/offer.model';

export const handleAddOffer = async (req: Request, res: Response) => {
  try {
    const offer = await OfferModel.create(req.body);

    res.status(201).send(offer);
  } catch (error) {
    res.status(500).send({ message: 'Failed to create offer' });
  }
};

export const handleGetAllOffers = async (req: Request, res: Response) => {
  try {
    const { title, ageMin, ageMax, game, gender, userId } = req.query;

    const query = OfferModel.find({ isActive: true });

    if (title)
      query.where('title', new RegExp(title.toString(), 'i'));

    if (ageMin)
      query.where('minAge').gte(parseInt(ageMin.toString()));

    if (ageMax)
      query.where('maxAge').lte(parseInt(ageMax.toString()));

    if (game)
      query.where('game', game);

    if (gender)
      query.where('gender', gender);

    if (userId)
      query.where({ _user: { $ne: userId }, 'applicants._user': { $ne: userId } });

    query.populate('_user');

    const offers = await query.exec();

    res.status(200).json(offers);
  } catch (error: any) {
    console.log(error);
  }
};

export const handleGetOffer = async (req: Request, res: Response) => {
  try {
    const offerId = req.params.id;

    const offer = await OfferModel
      .findOne({ _id: offerId })
      .populate('_user')
      .populate('applicants._user');

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

export const handleUpdateOffer = async (req: Request, res: Response) => {
  try {
    const offerId = req.params.id;
    const { newOffer } = req.body;

    const offer = await OfferModel.findByIdAndUpdate(offerId, newOffer, { new: true });

    if (!offer) {
      return res.status(404).json({ error: 'Document not found' });
    }

    return res.json({ message: 'Document updated successfully', offer });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};