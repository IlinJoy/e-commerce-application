import { z } from 'zod';
import {
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePostalCode,
} from './validation-functions';

const addressSchema = z
  .object({
    country: z.enum(['US', 'CN', '']),
    streetName: z.string().trim().nonempty(),
    postalCode: z.string().nonempty(),
    city: validateName(),
  })
  .superRefine((data, ctx) => {
    validatePostalCode({
      data,
      ctx,
    });
  });

export type Addresses = z.infer<typeof addressSchema>;

export const registrationSchema = z.object({
  customerData: z.object({
    email: validateEmail(),
    password: validatePassword(),
    firstName: validateName(),
    lastName: validateName(),
    dateOfBirth: validateDate(),
  }),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAddress: z.boolean().optional(),
  shippingDefaultAddress: z.boolean().optional(),
  billingDefaultAddress: z.boolean().optional(),
});

export type RegisterFormInputs = z.infer<typeof registrationSchema>;
