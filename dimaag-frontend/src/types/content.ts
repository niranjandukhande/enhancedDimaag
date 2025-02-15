import { z } from "zod";
export const contentSchema = z.object({
  title: z.string(),
  typeOfContent: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
  link: z.string().url(),
});

export type contentType = z.infer<typeof contentSchema>;
