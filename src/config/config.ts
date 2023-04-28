import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URL = 'mongodb://localhost:27017/teamMeDB' || process.env.DB_CONN_STRING;

export const SERVER_PORT = process.env.SERVER_PROT || 5000;

export const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'jdsalkhfjhekljhdwajdhsjkh';
export const SERVER_TOKEN_REFRESH = process.env.SERVER_TOKEN_REFRESH || 'dsaijufhaheifhah';
export const SERVER_TOKEN_EXPIRETIME = '30m' || process.env.SERVER_TOKEN_EXPIRETIME;
export const SERVER_TOKEN_REFRESH_EXPIRETIME = '120m' || process.env.SERVER_TOKEN_REFRESH_EXPIRETIME;