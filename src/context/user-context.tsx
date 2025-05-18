/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useCallback, useState } from 'react';
import type { Customer } from '@commercetools/platform-sdk';

type User = Pick<Customer, 'email' | 'password' | 'firstName' | 'lastName' | 'dateOfBirth' | 'addresses'>;

type UserContextType = {
  user: User | null;
  resetProfile: () => void;
  updateProfile: (newData: Partial<User>) => void;
  addUser: (customer: Customer) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  resetProfile: () => {},
  updateProfile: () => {},
  addUser: () => {},
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const addUser = useCallback(
    (customer: Customer) =>
      setUser({
        email: customer.email,
        password: customer.password,
        firstName: customer.firstName,
        lastName: customer.lastName,
        dateOfBirth: customer.dateOfBirth,
        addresses: customer.addresses,
      }),
    []
  );

  const resetProfile = useCallback(() => setUser(null), []);

  const updateProfile = useCallback(
    (newData: Partial<User>) => setUser((user) => (user ? { ...user, ...newData } : user)),
    []
  );

  return <UserContext.Provider value={{ user, resetProfile, updateProfile, addUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = use(UserContext);
  if (!context) {
    throw new Error('Must be used within a UserContextProvider');
  }
  return context;
};
