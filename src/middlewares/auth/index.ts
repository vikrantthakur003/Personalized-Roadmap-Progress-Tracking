import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { makeResponse } from '../../lib';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return makeResponse(res, 401, false, 'unauthorized');
    }
    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
      if (err) {
        return makeResponse(res, 401, false, 'unauthorized');
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return makeResponse(res, 401, false, 'unauthorized');
  }
};