import { useCallback } from 'react';

import { getDiscountCodeByKey } from '@/api/promo';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { useToast } from '@/context/toast-provider';
import { useCart } from '@/context/cart-context';

export const useDiscountCode = () => {
  const { showToast } = useToast();
  const { addDiscount } = useCart();

  const setDiscountToCart = useCallback(
    async (key?: string) => {
      try {
        if (!key) {
          return;
        }

        const promoCode = await getDiscountCodeByKey(key);
        addDiscount(promoCode);
        showToast({ message: SUCCESS_MESSAGES.PROMO_APPLIED });
        return promoCode;
      } catch {
        showToast({ message: ERROR_MESSAGES.SOMETHING_WRONG, isError: true });
      }
    },
    [addDiscount, showToast]
  );

  return { setDiscountToCart };
};
