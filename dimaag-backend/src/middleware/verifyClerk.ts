import { isVerifiedWithClerk } from '@/helpers/isVerifiedWithClerk';
import { verifyToken } from '@clerk/express';
import { NextFunction, Request, Response } from 'express';

export async function verifyClerkSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log('verifying clerk session');
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('NO TOKEN PROVIDED');
    }

    const isAuthenticated = await isVerifiedWithClerk(token);
    if (isAuthenticated) {
      req.userId = isAuthenticated.sub;
      req.sessionId = isAuthenticated.sid;
    } else {
      res.status(401).json({ message: 'INVALID TOKEN' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'NO TOKEN PROVIDED' });
  }
}
