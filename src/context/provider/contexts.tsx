import type { Customer } from '@commercetools/platform-sdk';
import { createContext } from 'react';

//---------TOKEN

type TokenContextType = {
  token: string;
  handleUpdateToken: (token: string) => void;
  handleResetToken: () => void;
};

export const TokenContext = createContext<TokenContextType>({
  token: '',
  handleResetToken: () => {},
  handleUpdateToken: () => {},
});

export type User = Pick<Customer, 'email' | 'password' | 'firstName' | 'lastName' | 'dateOfBirth' | 'addresses'>;

//---------USER

type UserContextType = {
  user: User | null;
  resetProfile: () => void;
  updateProfile: (newData: Partial<User>) => void | null;
  addUser: (customer: Customer) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  resetProfile: () => {},
  updateProfile: () => {},
  addUser: () => {},
});
