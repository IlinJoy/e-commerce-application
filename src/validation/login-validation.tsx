import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

export const loginSchema = z.object({
  email: z.string().email('Must contain only English letters, "@" and valid domain without spaces.'),
  password: z.string().superRefine((data, ctx) => {
    if (data.startsWith(' ')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must not starts with whitespace',
      });
    }
    if (data.endsWith(' ')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must not ends with whitespace',
      });
    }
    if (!/\p{Lu}/u.test(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must contain at least one uppercase letter',
      });
    }
    if (!/\p{Ll}/u.test(data)) {
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
    if (data.length < MIN_PASSWORD_LENGTH) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least 8 characters',
      });
    }
  }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
