import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

export const loginSchema = z.object({
  email: z.string().trim().email('Must contain "@" and valid domain'),
  password: z.string().superRefine((data, ctx) => {
    if (!/[A-Z]/.test(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must contain at least one uppercase letter',
      });
    }
    if (!/[a-z]/.test(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must contain at least one lowercase letter',
      });
    }
    if (!/[0-9]/.test(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must contain at least one digit',
      });
    }
    if (!/[!@#$%^&*]/.test(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must contain at least one special character: ! @ # $ % ^ & *',
      });
    }
    if (data.trim().length < MIN_PASSWORD_LENGTH) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least 8 characters, ignoring spaces at the start or end',
      });
    }
  }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
