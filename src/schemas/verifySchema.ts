import {z} from 'zod';

export const verifyCodeValidation = z.string().length(6, "Verification code must be 6 characters long");

export const verifySchema = z.object({
    username: z.string(),
    code: verifyCodeValidation
});
     
