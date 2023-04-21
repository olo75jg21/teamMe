import { Express } from 'express';
import {
  handleAddOffer,
  handleApplyOnOffer,
  handleGetAllOffers,
  handleGetMyOffers
} from '../controllers/offer.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';
import { schemaValidation } from '../middlewares/validation';
import { yupOfferCreationSchema } from '../validation/offerValidationSchema';

// TODO Fix routes names
export const offerRoutes = (app: Express) => {
  app.get('/offer/getAll', handleGetAllOffers);
  app.get('/offer/getMyOffers', authenticateJwt, handleGetMyOffers);
  app.post('/offer/addNewOffer', [authenticateJwt, schemaValidation(yupOfferCreationSchema)], handleAddOffer);
  app.post('/offer/apply', handleApplyOnOffer);
};