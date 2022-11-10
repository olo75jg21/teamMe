"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_TOKEN_EXPIRETIME = exports.SERVER_TOKEN_REFRESH = exports.SERVER_TOKEN_SECRET = exports.SERVER_PORT = exports.MONGO_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URL = process.env.DB_CONN_STRING || '';
exports.SERVER_PORT = process.env.SERVER_PROT || 5000;
exports.SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'jdsalkhfjhekljhdwajdhsjkh';
exports.SERVER_TOKEN_REFRESH = process.env.SERVER_TOKEN_REFRESH || 'dsaijufhaheifhah';
exports.SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || '15m';
