import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  type: z.enum(["article", "package", "user_update"]),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  author: z.string(),
  imageUrl: z.string().url().optional(),
  timestamp: z.string().datetime({ offset: true }).optional(),
  tags: z.array(z.string()).optional(),
  likes: z.number().int().nonnegative().default(0),
  comments: z.number().int().nonnegative().default(0),
  link: z.string().url().optional(),
});
