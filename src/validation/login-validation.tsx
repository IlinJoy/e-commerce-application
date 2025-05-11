import { z } from 'zod';

const PASSWORD_LENGTH = 6;

export const loginSchema = z.object({
  email: z.string().email('Must contain "@" and valid domain'),
  password: z
    .string()
    .trim()
    .min(PASSWORD_LENGTH, '6 characters only, trimmed')
    .max(PASSWORD_LENGTH, '6 characters only, trimmed'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
