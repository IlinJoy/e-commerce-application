import type { Customer } from '@commercetools/platform-sdk';
import { createContext } from 'react';

//---------TOKEN

type TokenContextType = {
  token: string;
  updateToken: (token: string) => void;
  resetToken: () => void;
};

export const TokenContext = createContext<TokenContextType>({
  token: '',
  resetToken: () => {},
  updateToken: () => {},
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
