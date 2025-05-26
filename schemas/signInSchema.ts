import {z} from 'zod';
export const signSchema = z.object({
 identifier: z.string(),
 password: z.string(),
});