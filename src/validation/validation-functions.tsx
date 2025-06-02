import { z, ZodIssueCode } from 'zod';
import type { Addresses } from './registration-validation';

const MIN_PASSWORD_LENGTH = 8;
const MIN_AGE = 13;
const MAX_AGE = 130;

export const validatePassword = () => {
  return z.string().superRefine((data, ctx) => {
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
  });
};

export const validateEmail = () => {
  return z.string().email('Must contain only English letters, "@" and valid domain without spaces.');
};

export const validateName = () => {
  return z.string().superRefine((data, ctx) => {
    if (!/^[\p{L}]+$/u.test(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Only letters are allowed. No digits or special characters',
      });
    }
    if (data.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'This field is empty. Please, enter at least 1 character',
      });
    }
  });
};

export const validateDate = () => {
  return z
    .string()
    .nonempty()
    .superRefine((data, ctx) => {
      const today = new Date();
      const enteredDate = new Date(data);
      const age = today.getFullYear() - enteredDate.getFullYear();
      const isBeforeBirthday =
        today.getMonth() < enteredDate.getMonth() ||
        (today.getMonth() === enteredDate.getMonth() && today.getDate() < enteredDate.getDate());
      const fullAge = isBeforeBirthday ? age - 1 : age;
      if (fullAge < MIN_AGE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'You must be at least 13 years old.',
        });
      }
      if (fullAge > MAX_AGE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'You must be younger than 130 years. Please, enter another year of birth',
        });
      }
    });
};

type ValidatePostalCodeProps = {
  data: Addresses;
  ctx: z.RefinementCtx;
};

export const validatePostalCode = ({ data, ctx }: ValidatePostalCodeProps) => {
  const country = data.country;
  const postalCode = data.postalCode;

  if (country === 'US' && !/^\d{5}$/.test(postalCode)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Only 5 digits are required',
      path: ['postalCode'],
    });
  }
  if (country === 'CN' && !/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(postalCode)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Must follow the format: A1B 2C3',
      path: ['postalCode'],
    });
  }
  if (!country && postalCode.length > 0) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Select your country first',
      path: ['postalCode'],
    });
  }
};
