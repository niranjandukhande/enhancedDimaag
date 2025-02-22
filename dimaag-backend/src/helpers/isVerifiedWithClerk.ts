import { verifyToken } from '@clerk/express';

export async function isVerifiedWithClerk(token: string | undefined) {
  if (!token) return false;
  const result = await verifyToken(token, {
    jwtKey: process.env.CLERK_JWT_KEY,

    authorizedParties: [process.env.ALLOWED_ORIGINS!],
  });
  return result.sub ? result : false;
}
