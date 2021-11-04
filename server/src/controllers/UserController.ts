import jwt from "jsonwebtoken";

import { UsersRepository } from "../repositories/UsersRepository";

type User = {
  id?: string;
  name?: string;
  email: string;
  password: string;
};

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

    const user = await UsersRepository.create({ name, email, password });

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

    const user = (await UsersRepository.findByEmail(email)) as unknown as User;

    if (!user) {
      return res.status(400).json({ error: "User not exists" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: `Password incorrect!` });
    }

    const token = jwt.sign({}, process.env.jwtSecret, {
      subject: user.id,
      expiresIn: 60 * 60 * 24,
    });

    return res.status(200).json({ token, email: user.email, name: user.name });
  }

  async show(req, res) {
    const { userToken } = req;

    const user = (await UsersRepository.findById(userToken)) as unknown as User;

    res.json(user);
  }
}

export const UserController = new UserControllerClass();
