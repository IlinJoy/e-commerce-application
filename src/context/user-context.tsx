import type { ReactNode } from 'react';
import { useState } from 'react';
import type { User } from './provider/contexts';
import { UserContext } from './provider/contexts';

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const resetProfile = () => setUser(null);
  const updateProfile = (newData: Partial<User>) => user && setUser({ ...user, ...newData });

  return <UserContext.Provider value={{ user, resetProfile, updateProfile, setUser }}>{children}</UserContext.Provider>;
}
