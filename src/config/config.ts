import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URL = process.env.DB_CONN_STRING || '';

export const SERVER_PORT = process.env.SERVER_PROT || 5000;

export const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'jdsalkhfjhekljhdwajdhsjkh';
export const SERVER_TOKEN_REFRESH = process.env.SERVER_TOKEN_REFRESH || 'dsaijufhaheifhah';
export const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || '15m'; 