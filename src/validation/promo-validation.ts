import { z } from 'zod';

export const promoSchema = z.object({
  promo: z.string().superRefine((data, ctx) => {
    if (!data) {
      return;
    }
    if (!/^[A-Z_0-9]+$/.test(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be uppercase Latin letters with underscores',
      });
    }
    if (/\s/.test(data)) {
      console.log(data);
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Promo code must not contain whitespace.',
      });
    }
  }),
});

export type PromoInput = z.infer<typeof promoSchema>;
