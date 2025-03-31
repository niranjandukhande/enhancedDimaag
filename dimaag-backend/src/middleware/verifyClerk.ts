import { getAuth } from '@clerk/express';

import { NextFunction, Request, Response } from 'express';

export async function verifyClerkSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const response = getAuth(req);

  console.log('verifying clerk session');

  if (response.userId && response.sessionId) {
    req.userId = response.userId;
    req.sessionId = response.sessionId;
    next();
  } else {
    res.status(401).json({ message: 'INVALID TOKEN' });
  }
}
