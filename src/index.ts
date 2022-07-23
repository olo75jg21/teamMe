import express from 'express';
import cors from 'cors';
import { connect } from './utils/connectDb';
import { userRoutes } from './routes/user.routes';

import { SERVER_PORT } from './config/config';

const app = express();
app.use(cors());

connect();

app.use(express.json());
userRoutes(app);

app.listen(SERVER_PORT, () => {
  console.log('Server is running on port ' + SERVER_PORT);
});