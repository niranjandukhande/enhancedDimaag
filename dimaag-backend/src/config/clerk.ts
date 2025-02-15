import { clerkClient, createClerkClient } from "@clerk/express";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  jwtKey: process.env.CLERK_JWT_KEY,
  domain: process.env.CLERK_JWKS_URL,
});

export default clerk;
