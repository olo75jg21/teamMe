import { Express } from 'express';
import {
  handleAddOffer,
  handleGetAllOffers,
  handleGetMyOffers
} from '../controllers/offer.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';

export const offerRoutes = (app: Express) => {
  app.post('/offer/addNewOffer', authenticateJwt, handleAddOffer);
  app.get('/offer/getAll', handleGetAllOffers);
  app.get('/offer/getMyOffers', authenticateJwt, handleGetMyOffers);
};