import { Express } from 'express';
import { 
  handleAddOffer,
  handleGetAllOffers,
  handleGetMyOffers
} from '../controllers/offer.controller';

export const offerRoutes = (app: Express) => {
  app.post('/offer/addNewOffer', handleAddOffer);
  app.get('/offer/getAll', handleGetAllOffers);
  app.get('/offer/getMyOffers', handleGetMyOffers);
};