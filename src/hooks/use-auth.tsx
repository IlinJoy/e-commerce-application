import { getOrCreateCart } from '@/api/cart';
import { useCart } from '@/context/cart-context';
import { useToken } from '@/context/token-context';
import { ERROR_MESSAGES } from '@/utils/constants/messages';
import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import { useCallback } from 'react';

export type FetchedCustomer = { customer: CustomerSignInResult; customerToken: string };

export const useAuth = () => {
  const { setCart, resetCart } = useCart();
  const { updateToken, resetToken, token } = useToken();
  const isLoggedIn = !!token;

  const onLogin = useCallback(
    async (data?: FetchedCustomer) => {
      if (!data) {
        throw new Error(ERROR_MESSAGES.LOGIN_FAIL);
      }
      updateToken(data.customerToken);

      const cart = await getOrCreateCart(data.customerToken);
      setCart(cart);
    },
    [setCart, updateToken]
  );

  const onLogout = useCallback(() => {
    resetToken();
    resetCart();
  }, [resetCart, resetToken]);

  return { onLogin, onLogout, isLoggedIn };
};
