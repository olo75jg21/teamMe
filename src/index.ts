import express from 'express';
import { connect } from './utils/connectDb';
import { userRoutes } from './routes/user.routes';

const app = express();
const port = 5000;

connect();

app.use(express.json());
userRoutes(app);

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});