import { verifyToken } from '../../utils/utils.verifytoken';
import env from '../../config/environment';
import { NextFunction, Request, Response } from 'express';

/**
 * @description checks if a user making a request is authenticated to access a resource
 * @returns the next function or an error
 */
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: 'Not authenticated'
      });
    }
    const decodedToken = await verifyToken(
       req.headers.authorization, env.ACCESS_TOKEN_SECRET
   );
    if (!decodedToken) {
      return res.status(400).json({
        message: 'Invalid or expired token'
      });
    }
    return next();
  } catch (err) {
    console.error(err);
  }
};
