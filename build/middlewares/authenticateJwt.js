"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, config_1.SERVER_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(401).json({
                message: error,
            });
        }
        else {
            res.locals.jwt = user;
            next();
        }
    });
};
exports.authenticateJwt = authenticateJwt;
