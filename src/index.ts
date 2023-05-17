import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from './utils/connectDb';
import { userRoutes } from './routes/user.routes';
import { offerRoutes } from './routes/offer.routes';
import { authRoutes } from './routes/auth.routes';
import * as socketIO from 'socket.io';
import initializeChat from './controllers/chat.controller';
import { SERVER_PORT } from './config/config';

const app = express();
app.use(cors());
app.use(cookieParser());

connect();

app.use(express.json());

authRoutes(app);
userRoutes(app);
offerRoutes(app);

const server = app.listen(SERVER_PORT, () => {
  console.log('Server is running on port ' + SERVER_PORT);
});

const io = new socketIO.Server(server, {
  cors: {
    origin: '*', // Replace '*' with the actual origin of your React application
    methods: ['GET', 'POST'],
  },
});

// Initialize chat functionality
initializeChat(io);