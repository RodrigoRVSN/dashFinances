import { compare, hash } from "bcryptjs";
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
      return res.status(400).json({ error: `Você deve enviar um e-mail!` });
    }
    if (!email) {
      return res.status(400).json({ error: `Você deve enviar um e-mail!` });
    }
    if (!password) {
      return res.status(400).json({ error: `Você deve enviar uma senha!` });
    }

    const userExists = (await UsersRepository.findByEmail(
      email,
    )) as unknown as User;

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe!" });
    }

    const hashedPassword = await hash(password, 8);

    const user = await UsersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: `Você deve enviar um e-mail!` });
    }
    if (!password) {
      return res.status(400).json({ error: `Você deve enviar uma senha!` });
    }

    const user = (await UsersRepository.findByEmail(email)) as unknown as User;

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe!" });
    }

    const comparedPassword = await compare(password, user.password);
    if (!comparedPassword) {
      return res.status(400).json({ error: `Senha ou e-mail incorreta(o)!` });
    }

    const token = jwt.sign({}, process.env.jwtSecret, {
      subject: user.id,
      expiresIn: 60 * 60 * 24 * 30,
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
