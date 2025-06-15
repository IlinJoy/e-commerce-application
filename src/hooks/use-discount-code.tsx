import { useCallback } from 'react';
import { getDiscountCodeByKey } from '@/api/promo';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { useToast } from '@/context/toast-provider';

export const useDiscountCode = () => {
  const { showToast } = useToast();

  const copyDiscount = useCallback(
    async (key?: string) => {
      if (!key) {
        return;
      }
      try {
        const promoCode = await getDiscountCodeByKey(key);
        await navigator.clipboard.writeText(promoCode.code);
        showToast({ message: SUCCESS_MESSAGES.CODE_COPIED(promoCode.code) });
      } catch (error) {
        const message = error instanceof Error ? error.message : ERROR_MESSAGES.SOMETHING_WRONG;
        showToast({ message, isError: true });
      }
    },
    [showToast]
  );

  return { copyDiscount };
};
