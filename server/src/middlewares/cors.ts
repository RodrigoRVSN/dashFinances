import { Request, Response, NextFunction } from "express";

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost: 3000");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "x-app-id");
  res.setHeader("Access-Control-Max-Age", "10");

  next();
};

export { cors };
