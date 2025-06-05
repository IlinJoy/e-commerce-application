import { z } from 'zod';
import {
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePostalCode,
} from './validation-functions';

export const singleAddressSchema = z
  .object({
    country: z.enum(['US', 'CN', '']),
    state: z.string().trim().nonempty(),
    streetName: z.string().trim().nonempty(),
    postalCode: z.string().nonempty(),
    city: validateName(),
    shippingDefaultAddress: z.boolean().optional(),
    billingDefaultAddress: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    validatePostalCode({ data, ctx });
  });

export type Addresses = z.infer<typeof singleAddressSchema>;

export const profileSchema = z.object({
  customerData: z.object({
    email: validateEmail(),
    firstName: validateName(),
    lastName: validateName(),
    dateOfBirth: validateDate(),
  }),
});

export type ProfileFormInputs = z.infer<typeof profileSchema>;

export const passwordSchema = z.object({
  currentPassword: validatePassword(),
  newPassword: validatePassword(),
});

export type PasswordInputs = z.infer<typeof passwordSchema>;
