import type { ReactNode } from 'react';
import { AuthContextProvider } from '../user-context';
import { TokenContextProvider } from '../token-context';

export function CustomerProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <TokenContextProvider>{children}</TokenContextProvider>
    </AuthContextProvider>
  );
}
