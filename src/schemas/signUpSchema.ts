import { z } from "zod";
export const validUser= z.string().min(1, "Username is required").max(20, "Username must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");
export const signUqpSchema = z.object({
    username: z.string().email({message:"Invalid email format"}).min(1, {message:"Email is required"}).max(50,{ message:"Email must be less than 50 characters"}),
    password: z.string().min(8,{message:"Password must be at least 8 characters"} ).max(50, {message:"Password must be less than 50 characters"}),
    
})