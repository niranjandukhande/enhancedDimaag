import { z } from 'zod';

const userSchema = z.object({
  id: z.string().optional(),
  username: z.string(),
  clerkId: z.string(),
  bio: z.string().optional(),
  imageUrl: z.string().url(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type userType = z.infer<typeof userSchema>;
