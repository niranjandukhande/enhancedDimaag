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

    const resul1 = await verifyToken(token, {
      jwtKey: process.env.CLERK_JWT_KEY,

      authorizedParties: [process.env.ALLOWED_ORIGINS!],
    });
    req.userId = resul1.sub;
    req.sessionId = resul1.sid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'NO TOKEN PROVIDED' });
  }
}
