import { z } from 'zod';
export const contentSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  typeOfContent: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
  link: z.string().url(),
  summary: z.string().optional(),
});

export type contentType = z.infer<typeof contentSchema>;
