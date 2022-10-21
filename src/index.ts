import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from './utils/connectDb';
import { userRoutes } from './routes/user.routes';
import { offerRoutes } from './routes/offer.routes';

import { SERVER_PORT } from './config/config';

const app = express();
app.use(cors());
app.use(cookieParser());

connect();

app.use(express.json());

userRoutes(app);
offerRoutes(app);

app.listen(SERVER_PORT, () => {
  console.log('Server is running on port ' + SERVER_PORT);
});