"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateAccessToken = (userId) => {
    // return jwt.sign({ userId }, SERVER_TOKEN_SECRET, { expiresIn: SERVER_TOKEN_EXPIRETIME, algorithm: 'HS256' });
    return jsonwebtoken_1.default.sign({ userId }, config_1.SERVER_TOKEN_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.SERVER_TOKEN_REFRESH, { expiresIn: '2h', algorithm: 'HS256' });
};
exports.generateRefreshToken = generateRefreshToken;
