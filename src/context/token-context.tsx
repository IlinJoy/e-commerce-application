/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useCallback, useEffect, useRef, useState } from 'react';
import { cookieHandler } from '@/services/cookies/cookie-handler';
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
  const tokenFromCookies = cookieHandler.get('token') || '';
  const [token, setToken] = useState(tokenFromCookies);
  const hasAnonToken = useRef(!!cookieHandler.get('anonToken'));

  useEffect(() => {
    if (!tokenFromCookies && !hasAnonToken.current) {
      handleAnonToken();
      hasAnonToken.current = true;
    }
  }, [tokenFromCookies]);

  const updateToken = useCallback((token: string) => {
    setToken(token);
    cookieHandler.set('token', token);
  }, []);

  const resetToken = useCallback(() => {
    setToken('');
    cookieHandler.delete('token');
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
