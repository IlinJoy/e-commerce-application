import { useToken } from '@/context/token-context';
import { ERROR_MESSAGES } from '@/utils/constants/messages';
import type { Customer } from '@commercetools/platform-sdk';
import { useCallback } from 'react';

export type FetchedCustomer = { customer: Customer; customerToken: string };

export const useAuth = () => {
  const { updateToken, resetToken, token } = useToken();
  const isLoggedIn = !!token;

  const onLogin = useCallback(
    (data?: FetchedCustomer) => {
      if (!data) {
        throw new Error(ERROR_MESSAGES.LOGIN_FAIL);
      }
      updateToken(data.customerToken);
    },
    [updateToken]
  );

  const onLogout = useCallback(() => {
    resetToken();
  }, [resetToken]);

  return { onLogin, onLogout, isLoggedIn };
};
