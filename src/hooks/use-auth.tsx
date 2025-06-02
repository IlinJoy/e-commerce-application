import { useToken } from '@/context/token-context';
import { useUser } from '@/context/user-context';
import { ERROR_MESSAGES } from '@/utils/constants/messages';
import type { Customer } from '@commercetools/platform-sdk';
import { useCallback } from 'react';

export type FetchedCustomer = { customer: Customer; customerToken: string };

export const useAuth = () => {
  const { updateToken, resetToken, token } = useToken();
  const { resetProfile, addUser, user } = useUser();

  const isLoggedIn = !!token || !!user;

  const onRegistration = useCallback(
    (customer: Customer) => {
      addUser(customer);
    },
    [addUser]
  );

  const onLogin = useCallback(
    (data?: FetchedCustomer) => {
      if (!data) {
        throw new Error(ERROR_MESSAGES.LOGIN_FAIL);
      }
      updateToken(data.customerToken);
      addUser(data.customer);
    },
    [addUser, updateToken]
  );

  const onLogout = useCallback(() => {
    resetToken();
    resetProfile();
  }, [resetProfile, resetToken]);

  return { onLogin, onLogout, onRegistration, isLoggedIn };
};
