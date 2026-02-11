import { Request, Response, NextFunction } from "express";

export function logger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
    req.socket.remoteAddress;

  const timestamp = new Date().toISOString();

  console.log(
    `[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${ip}`
  );

  next();
}
