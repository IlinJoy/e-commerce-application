/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useCallback, useEffect, useState } from 'react';
import { anonCookieHandler, tokenCookieHandler } from '@/services/cookies/cookie-handler';
import { getAnonymousToken } from '@/api/platformApi';

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
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromCookies = tokenCookieHandler.get() || '';
    setToken(tokenFromCookies);

    if (!tokenFromCookies) {
      const handleAnonToken = async () => {
        const isExist = anonCookieHandler.get();
        if (!isExist) {
          const id = crypto.randomUUID();
          const anonToken = await getAnonymousToken(id);
          anonCookieHandler.set(anonToken);
        }
      };
      handleAnonToken();
    }
  }, []);

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
