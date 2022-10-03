"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const signJwt = (user) => {
    return jsonwebtoken_1.default.sign({ email: user.email }, config_1.SERVER_TOKEN_SECRET, { expiresIn: config_1.SERVER_TOKEN_EXPIRETIME, algorithm: 'HS256' });
};
exports.signJwt = signJwt;
// user.toJSON()
