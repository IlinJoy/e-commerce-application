/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useCallback, useEffect, useState } from 'react';
import { tokenCookieHandler } from '@/services/cookies/cookie-handler';
import { handleAnonToken } from '@/utils/request-token-handler';

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

export function TokenContextProvider({ children }: { children: ReactNode }) {
  const tokenFromCookies = tokenCookieHandler.get() || '';
  const [token, setToken] = useState(tokenFromCookies);

  useEffect(() => {
    if (!tokenFromCookies) {
      handleAnonToken();
    }
  }, [tokenFromCookies]);

  const updateToken = useCallback((token: string) => {
    setToken(token);
    tokenCookieHandler.set(token);
  }, []);

  const resetToken = useCallback(() => {
    setToken('');
    tokenCookieHandler.delete();
  }, []);

  return <TokenContext.Provider value={{ token, resetToken, updateToken }}>{children}</TokenContext.Provider>;
}

export const useToken = () => {
  const context = use(TokenContext);
  if (!context) {
    throw new Error('Must be used within a TokenContext.Provider');
  }
  return context;
};
