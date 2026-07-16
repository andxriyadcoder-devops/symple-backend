import { z } from 'zod';

export const sendCoinSchema = z.object({
  receiverUsername: z.string().min(3),
  amount: z.number().positive(),
});

export const withdrawSchema = z.object({
  amount: z.number().positive(),
});