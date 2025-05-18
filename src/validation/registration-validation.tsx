import { z } from 'zod';
import {
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePostalCode,
} from './validation-functions';

export const registrationSchema = z
  .object({
    email: validateEmail(),
    password: validatePassword(),
    firstName: validateName(),
    lastName: validateName(),
    dateOfBirth: validateDate(),

    shippingStreet: z.string().trim().nonempty(),
    shippingCity: validateName(),
    shippingCountry: z.enum(['USA', 'Canada', '']),
    shippingPostalCode: z.string().nonempty(),

    billingStreet: z.string().trim().nonempty(),
    billingCity: validateName(),
    billingCountry: z.enum(['USA', 'Canada', '']),
    billingPostalCode: z.string().nonempty(),

    sameAddress: z.boolean().optional(),

    shippingDefaultAddress: z.boolean(),
    billingDefaultAddress: z.boolean(),
  })
  .superRefine((data, ctx) => {
    // Shipping
    validatePostalCode({
      country: data.shippingCountry,
      postalCode: data.shippingPostalCode,
      ctx,
      path: ['shippingPostalCode'],
    });

    // Billing
    validatePostalCode({
      country: data.billingCountry,
      postalCode: data.billingPostalCode,
      ctx,
      path: ['billingPostalCode'],
    });
  });

export type RegisterFormInputs = z.infer<typeof registrationSchema>;
