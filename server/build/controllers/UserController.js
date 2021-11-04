"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UsersRepository_1 = require("../repositories/UsersRepository");
class UserControllerClass {
    async store(req, res) {
        const { name, email, password } = req.body;
        if (!name) {
            return res.status(400).json({ error: `You should send name!` });
        }
        if (!email) {
            return res.status(400).json({ error: `You should send email!` });
        }
        if (!password) {
            return res.status(400).json({ error: `You should send password!` });
        }
        const user = await UsersRepository_1.UsersRepository.create({ name, email, password });
        return res.status(201).json(user);
    }
    async login(req, res) {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ error: `You should send email!` });
        }
        if (!password) {
            return res.status(400).json({ error: `You should send password!` });
        }
        const user = (await UsersRepository_1.UsersRepository.findByEmail(email));
        if (!user) {
            return res.status(400).json({ error: "User not exists" });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: `Password incorrect!` });
        }
        const token = jsonwebtoken_1.default.sign({}, "supersecretsomuchsecret", {
            subject: user.id,
            expiresIn: 60 * 60 * 24,
        });
        return res.status(200).json({ token, email: user.email, name: user.name });
    }
    async show(req, res) {
        const { userToken } = req;
        const user = (await UsersRepository_1.UsersRepository.findById(userToken));
        res.json(user);
    }
}
exports.UserController = new UserControllerClass();
