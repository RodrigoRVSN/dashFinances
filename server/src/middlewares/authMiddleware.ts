import jwt from "jsonwebtoken";

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401);
  }

  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, "supersecretsomuchsecret");

    const { sub } = data as ITokenPayload;

    req.userToken = sub;

    return next();
  } catch {
    return res.status(401);
  }
}
