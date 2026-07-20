import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters"),

    username: z
      .string()
      .min(3)
      .max(20),

    email: z
      .string()
      .email()
      .optional(),

    phone: z
      .string()
      .min(11)
      .max(15)
      .optional(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    referralCode: z
      .string()
      .optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    emailOrUsername: z.string(),

    password: z.string().min(6),
  }),
});