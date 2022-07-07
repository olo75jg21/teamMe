"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetOneUser = exports.handleGetAllUsers = exports.handleUserLogin = exports.handleUserRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jwt_utils_1 = require("../utils/jwt.utils");
const handleUserRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_model_1.UserModel.create({ email, username, password: hashedPassword });
        res.status(201).send(user);
    }
    catch (e) {
        res.status(409).send(e.message);
    }
});
exports.handleUserRegister = handleUserRegister;
const handleUserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const user = yield user_model_1.UserModel.findOne({ email });
        if (user) {
            const comparePassword = yield bcrypt_1.default.compare(password, user.password);
            if (comparePassword) {
                const jwt = (0, jwt_utils_1.signJwt)(user);
                return res.status(200).send({ user, token: jwt });
            }
            return res.json({
                message: 'Wrong username or password.'
            });
        }
        return res.status(401).json({
            message: 'Wrong username or password.'
        });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send(e);
    }
});
exports.handleUserLogin = handleUserLogin;
const handleGetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find({});
    res.send(users);
});
exports.handleGetAllUsers = handleGetAllUsers;
const handleGetOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ _id: req.params.id });
    console.log(req.params);
    res.send(user);
});
exports.handleGetOneUser = handleGetOneUser;
