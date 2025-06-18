import { useCallback } from 'react';
import { getDiscountCodes } from '@/api/promo';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { useToast } from '@/context/toast-provider';
import { useQuery } from '@tanstack/react-query';

export const useDiscountCode = () => {
  const { showToast } = useToast();
  const { data: discountCodes, isLoading } = useQuery({ queryKey: ['discount codes'], queryFn: getDiscountCodes });

  const getDiscountCode = useCallback(
    (key: string) => discountCodes?.find((code) => code.key === key)?.code,
    [discountCodes]
  );

  const copyDiscount = useCallback(
    async (key?: string) => {
      if (!key) {
        return;
      }
      try {
        const promoCode = getDiscountCode(key);
        if (promoCode) {
          await navigator.clipboard.writeText(promoCode);
          showToast({ message: SUCCESS_MESSAGES.CODE_COPIED(promoCode) });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : ERROR_MESSAGES.SOMETHING_WRONG;
        showToast({ message, isError: true });
      }
    },
    [getDiscountCode, showToast]
  );

  return { copyDiscount, discountCodes, isLoading, getDiscountCode };
};
