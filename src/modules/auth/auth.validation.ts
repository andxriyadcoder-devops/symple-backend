import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(3).max(100),

  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/),

  email: z.string().email().optional(),

  phone: z.string().optional(),

  password: z.string().min(6).max(100),

  referralCode: z.string().optional(),
});

export const loginSchema = z.object({
  emailOrUsername: z.string().min(3),

  password: z.string().min(6),
});