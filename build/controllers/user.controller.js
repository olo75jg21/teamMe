"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddUserInterest = exports.handleUpdateUserProfile = exports.handleGetUserProfileData = exports.handleGetOneUser = void 0;
const _ = __importStar(require("lodash"));
const user_model_1 = require("../models/user.model");
const handleGetOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ _id: req.params.id });
    res.send(_.omit(user === null || user === void 0 ? void 0 : user.toObject(), ["password"]));
});
exports.handleGetOneUser = handleGetOneUser;
const handleGetUserProfileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ _id: req.params.id });
        res.status(200).send(_.omit(user === null || user === void 0 ? void 0 : user.toObject(), ["password", "updatedAt"]));
    }
    catch (error) {
        res.status(404).send(error);
        console.error(error);
    }
});
exports.handleGetUserProfileData = handleGetUserProfileData;
const handleUpdateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username } = req.body;
    try {
        // Check if a user with the same username already exists
        const existingUser = yield user_model_1.UserModel.findOne({ username });
        if (existingUser && existingUser._id.toString() !== id) {
            return res
                .status(400)
                .json({ error: "Username already exists. Cannot change data." });
        }
        // Find the user by ID and update the fields
        const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.handleUpdateUserProfile = handleUpdateUserProfile;
const handleAddUserInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const interest = req.body;
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.interests.push(interest);
        yield user.save();
        res.status(200).json(user);
    }
    catch (e) {
        res.status(404).send(e);
    }
});
exports.handleAddUserInterest = handleAddUserInterest;
