import { ErrorRequestHandler, Request, Response } from "express";

const errorHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
): void => {
  res.sendStatus(500);
};

export { errorHandler };
