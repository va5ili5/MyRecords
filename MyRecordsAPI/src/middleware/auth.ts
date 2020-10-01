import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers?.authorization?.split(' ')[1]!;
    jwt.verify(token, process.env.JWTSECRET!);
    next();
  } catch (error) {
    response.status(401).json({
      message: 'Authentication failed',
    });
  }
};
