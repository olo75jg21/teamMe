import { Express } from 'express';
import {
  handleAddOffer,
  handleApplyOnOffer,
  handleGetAllUserOffers,
  handleGetAllOffers,
  handleGetOffer,
  handleGetAllUserApplications,
} from '../controllers/offer.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';
import { schemaValidation } from '../middlewares/validation';
import { yupOfferCreationSchema } from '../validation/offerValidationSchema';

export const offerRoutes = (app: Express) => {
  // Get all offers
  app.get('/offers', handleGetAllOffers);

  // Get all given user offers, pass id of user as a Param
  app.get('/offers/user', authenticateJwt, handleGetAllUserOffers);

  // Get all of application for given user id
  app.get('/offers/applications', handleGetAllUserApplications);

  // Create new offer
  app.post('/offers/new', [authenticateJwt, schemaValidation(yupOfferCreationSchema)], handleAddOffer);

  // Apply for offer with given offer id
  app.post('/offers/apply', authenticateJwt, handleApplyOnOffer);

  // Get single offer
  app.get('/offers/:id', handleGetOffer);
};