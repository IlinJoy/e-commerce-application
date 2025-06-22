import type { ReactNode } from 'react';
import { TokenContextProvider } from '../token-context';
import { CartContextProvider } from '../cart-context';

export function CustomerProvider({ children }: { children: ReactNode }) {
  return (
    <TokenContextProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </TokenContextProvider>
  );
}
