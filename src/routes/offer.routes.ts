import { Express } from 'express';
import {
  handleAddOffer,
  handleApplyOnOffer,
  handleGetAllUserOffers,
  handleGetAllOffers,
  handleGetUserApplications,
} from '../controllers/offer.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';
import { schemaValidation } from '../middlewares/validation';
import { yupOfferCreationSchema } from '../validation/offerValidationSchema';

// TODO Fix routes names
export const offerRoutes = (app: Express) => {
  app.get('/offer/getAll', handleGetAllOffers);
  app.get('/offer/allUserOffers', authenticateJwt, handleGetAllUserOffers);
  app.get('/offer/userApplications', authenticateJwt, handleGetUserApplications);
  app.post('/offer/addNewOffer', [authenticateJwt, schemaValidation(yupOfferCreationSchema)], handleAddOffer);
  app.post('/offer/apply', handleApplyOnOffer);
};