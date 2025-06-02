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
    state: z.string().trim().nonempty(),
    streetName: z.string().trim().nonempty(),
    postalCode: z.string().nonempty(),
    city: validateName(),
    isDefault: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    validatePostalCode({
      data,
      ctx,
    });
  });

export type Addresses = z.infer<typeof addressSchema>;

export const profileSchema = z.object({
  customerData: z.object({
    email: validateEmail(),
    firstName: validateName(),
    lastName: validateName(),
    dateOfBirth: validateDate(),
  }),
  shippingAddresses: z.array(addressSchema),
  billingAddresses: z.array(addressSchema),
});

export type ProfileFormInputs = z.infer<typeof profileSchema>;

export const passwordSchema = z.object({
  currentPassword: validatePassword(),
  newPassword: validatePassword(),
});

export type PasswordChangeInputs = z.infer<typeof passwordSchema>;
