import type { ReactNode } from 'react';
import { useState } from 'react';
import type { User } from './provider/contexts';
import { UserContext } from './provider/contexts';
import type { Customer } from '@commercetools/platform-sdk';

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const addUser = (customer: Customer) =>
    setUser({
      email: customer.email,
      password: customer.password,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      addresses: customer.addresses,
    });

  const resetProfile = () => setUser(null);
  const updateProfile = (newData: Partial<User>) => user && setUser({ ...user, ...newData });

  return <UserContext.Provider value={{ user, resetProfile, updateProfile, addUser }}>{children}</UserContext.Provider>;
}
