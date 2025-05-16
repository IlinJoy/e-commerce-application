import { z } from 'zod';
import {
  validateCanadianCode,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validateUnknownCode,
  validateUSACode,
} from './validation-functions';

export const registrationSchema = z.object({
  email: validateEmail(),
  password: validatePassword(),
  firstName: validateName(),
  lastName: validateName(),
  dateOfBirth: validateDate(),

  shippingStreet: z.string().trim().nonempty(),
  shippingCity: validateName(),
  shippingCountry: z.enum(['USA', 'Canada']),
  shippingPostalCode: validateUnknownCode(),
  shippingUSACode: validateUSACode(),
  shippingCanadianCode: validateCanadianCode(),

  billingStreet: z.string().trim().nonempty(),
  billingCity: validateName(),
  billingCountry: z.enum(['USA', 'Canada']),
  billingPostalCode: validateUnknownCode(),
  billingUSACode: validateUSACode(),
  billingCanadianCode: validateCanadianCode(),

  sameAddress: z.boolean().optional(),
});

export type RegisterFormInputs = z.infer<typeof registrationSchema>;
