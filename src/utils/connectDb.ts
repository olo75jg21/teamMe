import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const connect = async () => {
  let uri: string;
  if (process.env.DB_CONN_STRING) {
    uri = process.env.DB_CONN_STRING
  } else {
    throw new Error("DB_CONN_STRING environment variable is not set")
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');
  } catch (e) {
    console.error('Coult not connect to DB');
    process.exit(1);
  }
};