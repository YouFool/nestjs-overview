import { NextFunction, Request, Response } from 'express';

// We can export the Middleware as a function if it doesn't need any dependencies
export function anotherLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Logger2: Request object: ${req} \n Response object: ${res}`);
  next();
}
