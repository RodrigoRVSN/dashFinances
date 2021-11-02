import { ErrorRequestHandler, Request, Response } from "express";

const errorHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
): void => {
  res.status(500).json({ error: error.name });
};

export { errorHandler };
