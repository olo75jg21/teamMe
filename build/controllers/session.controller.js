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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSessionHandler = void 0;
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate the user's password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        // create a session
        const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
        // create an access token
        const accessToken = signJ(Object.assign(Object.assign({}, user), { session: session._id }), "accessTokenPrivateKey", { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
        );
        // create a refresh token
        const refreshToken = signJwt(Object.assign(Object.assign({}, user), { session: session._id }), "refreshTokenPrivateKey", { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
        );
        // return access & refresh tokens
        return res.send({ accessToken, refreshToken });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
