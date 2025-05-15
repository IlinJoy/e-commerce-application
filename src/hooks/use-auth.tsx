import { TokenContext, UserContext } from '@/context/provider/contexts';
import { ERROR_MESSAGES } from '@/utils/constants/messages';
import type { Customer } from '@commercetools/platform-sdk';
import { useContext } from 'react';

export type FetchedCustomer = { customer: Customer; customerToken: string };

export const useToken = () => useContext(TokenContext);
export const useUser = () => useContext(UserContext);

export const useAuth = () => {
  const { updateToken, resetToken } = useToken();
  const { resetProfile, addUser } = useUser();

  const onLogin = (data?: FetchedCustomer) => {
    if (!data) {
      throw new Error(ERROR_MESSAGES.LOGIN_FAIL);
    }
    updateToken(data.customerToken);
    addUser(data.customer);
  };

  const onLogout = () => {
    resetToken();
    resetProfile();
  };

  return { onLogin, onLogout };
};
