import { Express } from 'express';
import {
  handleAddOffer,
  handleApplyOnOffer,
  handleGetAllUserOffers,
  handleGetAllOffers,
  handleGetUserApplications,
  handleGetOffer,
} from '../controllers/offer.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';
import { schemaValidation } from '../middlewares/validation';
import { yupOfferCreationSchema } from '../validation/offerValidationSchema';

// TODO Fix routes names
export const offerRoutes = (app: Express) => {
  // Get all offers
  app.get('/offers', handleGetAllOffers);

  // Get all given user offers, pass id of user as a Param
  app.get('/offers/user', authenticateJwt, handleGetAllUserOffers);

  // Get single user offer
  // @TODO change it to be /offers/:id
  app.get('/offers/single', handleGetOffer);

  // Get all of given user application
  // @TODO change to /offers/:id/applications
  app.get('/offers/userApplications', authenticateJwt, handleGetUserApplications);

  // Create new offer
  app.post('/offers/new', [authenticateJwt, schemaValidation(yupOfferCreationSchema)], handleAddOffer);

  // @TODO change to /offers/:id/apply
  app.post('/offer/apply', handleApplyOnOffer);
};