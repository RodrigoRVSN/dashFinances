import jwt from "jsonwebtoken";

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: true, code: "Token inválido" });
  }

  const [, token] = authorization?.split(" ");

  if (!token) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  try {
    const data = jwt.verify(token, process.env.jwtSecret);

    const { sub } = data as ITokenPayload;

    req.userToken = sub;

    return next();
  } catch {
    return res
      .status(401)
      .json({ error: true, code: "token.expired", message: "Token invalid." });
  }
}
