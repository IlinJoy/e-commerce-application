import type { ReactNode } from 'react';
import { UserContextProvider } from '../user-context';
import { TokenContextProvider } from '../token-context';

export function CustomerProvider({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <TokenContextProvider>{children}</TokenContextProvider>
    </UserContextProvider>
  );
}
