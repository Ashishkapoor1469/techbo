import { z } from "zod";
export const MessageSchema = z.object({
    content: z.string().min(1,{message:"Content is required"}).max(500,{message:"content must be less than 500 characters"}),
    createdAt: z.date().default(()=> new Date())
})