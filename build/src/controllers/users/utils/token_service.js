"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.config)();
class Token {
    constructor() {
        this.create = (email, userId, role, status) => {
            const payload = { email, userId, role, status };
            try {
                if (!this.secret)
                    throw new Error('Token key is undefined');
                return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn: "1d" });
            }
            catch (error) {
                console.error(error);
            }
        };
        this.decode = (token) => {
            try {
                if (!this.secret)
                    throw new Error("Cannot access token key");
                const tokenPayload = jsonwebtoken_1.default.verify(token, this.secret);
                if (!tokenPayload)
                    throw new Error("Token could not be decoded.");
                return tokenPayload;
            }
            catch (error) {
                console.error(error);
            }
        };
        this.secret = process.env.token_secret;
    }
}
exports.Token = Token;
