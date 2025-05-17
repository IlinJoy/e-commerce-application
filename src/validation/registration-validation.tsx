import { z } from 'zod';
import { validateDate, validateEmail, validateName, validatePassword } from './validation-functions';

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
  })
  .superRefine((data, ctx) => {
    // Shipping
    if (data.shippingCountry === 'USA' && !/^\d{5}$/.test(data.shippingPostalCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Only 5 digits are required',
        path: ['shippingPostalCode'],
      });
    } else if (data.shippingCountry === 'Canada' && !/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(data.shippingPostalCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must follow the format: A1B 2C3',
        path: ['shippingPostalCode'],
      });
    } else if (!data.shippingCountry && data.shippingPostalCode.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Chose your country first',
        path: ['shippingPostalCode'],
      });
    }

    // Billing
    if (data.billingCountry === 'USA' && !/^\d{5}$/.test(data.billingPostalCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Only 5 digits are required',
        path: ['billingPostalCode'],
      });
    }
    if (data.billingCountry === 'Canada' && !/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(data.billingPostalCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must follow the format: A1B 2C3',
        path: ['billingPostalCode'],
      });
    }
    if (!data.billingCountry && data.billingPostalCode.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Chose your country first',
        path: ['billingPostalCode'],
      });
    }
  });

export type RegisterFormInputs = z.infer<typeof registrationSchema>;
