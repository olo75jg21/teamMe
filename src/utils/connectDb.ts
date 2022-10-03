import mongoose from 'mongoose';
import { MONGO_URL } from '../config/config';

export const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to DB');
  } catch (e) {
    console.error('Could not connect to DB');
    process.exit(1);
  }
};