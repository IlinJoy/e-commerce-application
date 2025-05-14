import { TokenContext, UserContext } from '@/context/provider/contexts';
import { ERROR_MESSAGES } from '@/utils/constants/messages';
import type { Customer } from '@commercetools/platform-sdk';
import { useContext } from 'react';

export type FetchedCustomer = { customer: Customer; customerToken: string };

export const useAuth = () => {
  const { token, handleResetToken, handleUpdateToken } = useContext(TokenContext);
  const { user, resetProfile, updateProfile, setUser } = useContext(UserContext);

  const onLogin = (data?: FetchedCustomer) => {
    if (!data) {
      throw new Error(ERROR_MESSAGES.LOGIN_FAIL);
    }
    const { customerToken, customer } = data;
    handleUpdateToken(customerToken);
    setUser({
      email: customer.email,
      password: customer.password,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      addresses: customer.addresses,
    });
    //displaySuccessMessage
  };

  const onLogout = () => {
    handleResetToken();
    resetProfile();
  };

  return { onLogin, onLogout, token, user, updateProfile };
};
