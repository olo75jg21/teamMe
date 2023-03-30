import { Express } from 'express';
import {
  handleAddOffer,
  handleGetAllOffers,
  handleGetMyOffers
} from '../controllers/offer.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';
import { schemaValidation } from '../middlewares/validation';
import { yupOfferCreationSchema } from '../validation/offerValidationSchema';

export const offerRoutes = (app: Express) => {
  app.post('/offer/addNewOffer', [authenticateJwt, schemaValidation(yupOfferCreationSchema)], handleAddOffer);
  app.get('/offer/getAll', handleGetAllOffers);
  app.get('/offer/getMyOffers', authenticateJwt, handleGetMyOffers);
};