"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send();
    }
    const [, token] = authorization.split(" ");
    try {
        const data = jsonwebtoken_1.default.verify(token, "supersecretsomuchsecret");
        const { sub } = data;
        req.userToken = sub;
        return next();
    }
    catch (_a) {
        return res.status(401).send();
    }
}
exports.default = authMiddleware;
