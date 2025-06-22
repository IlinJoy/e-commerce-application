import { z } from 'zod';
import { validateEmail, validatePassword } from './validation-functions';

export const loginSchema = z.object({
  email: validateEmail(),
  password: validatePassword(),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
